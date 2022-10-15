import http, { Server as Http1Server } from "http";
import http2, { Http2Server } from "http2";
import fs from "fs";

import { Application } from "./Application";
import { Request } from "../structures/requests/Request";
import { Response } from "../structures/requests/Response";
import { Router } from "../structures/Router";
import { NextValue } from "../structures/types/NextValue";

export class Server {
    public application: Application;
    public http1Server?: Http1Server;
    public http2Server?: Http2Server;

    constructor(application: Application) {
        this.application = application;

        // Create a HTTP2 server depending on the application options.
        if (this.application.options?.useHttp2) {
            this.http2Server = http2.createSecureServer({
                key: fs.readFileSync(this.application.options?.key ?? ""),
                cert: fs.readFileSync(this.application.options?.cert ?? "")
            });
        } else {
            this.http1Server = http.createServer();
        }
    }

    /**
     * Gets the relevant HTTP server to utilize.
     */
    get isHttp2() {
        return this.http2Server != null;
    }

    /**
     * Handles all of the events for the server.
     */
    private _handle() {
        if (this.isHttp2) {
            // TODO: HTTP/2 & HTTP/1.1 fallback event handling.
            //this.http2Server?.on("request", this._handleHTTP2Request.bind(this));
        } else {
            // Handle HTTP/1.1 requests.
            this.http1Server?.on("request", this._handleHTTP1Request.bind(this));
        }
    }

    private _handleHTTP1Request(req: http.IncomingMessage, res: http.ServerResponse) {
        // Split the URL into a path to handle and a query string.
        const url = new URL(req.url ?? "", `http://${req.headers.host}`);
        const path = url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;

        // Parse the request and response into their relevant objects.
        const request = new Request(req);
        const response = new Response(res);

        let routerIndex = 0;
        const next = (value?: NextValue) => {
            if (routerIndex >= this.application.routes.routers.length) {
                if (!response.sent) {
                    res.statusCode = 404;
                    res.end();
                }

                return;
            }

            // Get the router to handle the request.
            const router = this.application.routes.routers[routerIndex++];

            // Iterate through the layers of the router.
            let layerIndex = 0;
            const nextLayer = (value?: NextValue) => {
                if (layerIndex >= router.layers.length) {
                    next(value);
                    return;
                }

                // Get the layer to handle the request.
                const layer = router.layers[layerIndex++];

                if (value instanceof Error && !layer.isMiddleware) {
                    if (response.sent) {
                        // A response has been sent.
                        return;
                    }

                    // Skip ahead to the next layer if this is not an error middleware.
                    nextLayer(value);
                }

                // Check if the layer matches the path.
                if (layer.path == undefined) {
                    // Only handle the layer if it's a middleware.
                    if (layer.isMiddleware) {
                        layer.handle(request, response, nextLayer, value);
                    }
                } else {
                    if (layer.absolutePath === path) {
                        layer.handle(request, response, nextLayer, value);
                    } else {
                        // Parse the layer path into a parameter regex.
                        const regex = new RegExp(`^${layer.absolutePath.replace(/:([^/]*)+/g, "(?<$1>[^/]+)")}$`);

                        // Check if the path matches the regex.
                        if (regex.test(path)) {
                            // Parse the parameters from the path with matches from the regex.
                            const matches = path.match(regex);

                            // Map the groups to the parameters.
                            if (matches != null) {
                                for (const group in matches.groups ?? {}) {
                                    request.parameters.set(group, (matches.groups ?? {})[group]);
                                }   
                            }
                            
                            layer.handle(request, response, nextLayer, value);
                        } else {
                            nextLayer(value);
                        }
                    }
                }
            }

            // Go to the next layer.
            nextLayer(value);
        }

        // Go to the next router.
        next();
    }

    /**
     * Starts the server.
     * @param port The port to listen on.
     */
    start(port: number) {
        this._handle();

        if (this.isHttp2) {
            this.http2Server?.listen(port);
        } else {
            this.http1Server?.listen(port);
        }
    }
}