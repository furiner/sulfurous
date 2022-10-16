import http, { Server as Http1Server } from "http";
import http2, { Http2Server } from "http2";
import fs from "fs";

import { WebSocketServer } from "ws";

import { Application } from "./Application";
import { Request } from "../structures/requests/Request";
import { Response } from "../structures/requests/Response";
import { Router } from "../structures/Router";
import { NextValue } from "../structures/types/NextValue";
import { Layer } from "../structures/Layer";
import { RouteMethod } from "../structures/types/RouteMethod";
import { DataStream } from "../structures/data/DataStream";
import { WebsocketFunction } from "../structures/types/WebsocketFunction";

export class Server {
    public application: Application;
    public http1Server?: Http1Server;
    public http2Server?: Http2Server;
    public websockets: Map<string, WebSocketServer>;
    
    constructor(application: Application) {
        this.application = application;
        this.websockets = new Map();

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

    createWebsocketServer(routePath: string, websocketFunction: WebsocketFunction) {
        if (this.application.options?.websocketEnabled) {
            const websocket = new WebSocketServer({ 
                server: this.http1Server,
                path: routePath,
            });

            websocket.on("connection", websocketFunction);

            // Add the websocket server to the map.
            this.websockets.set(routePath, websocket);
        }
    }

    // INTERNAL METHODS
    /**
     * Handles all of the events for the server.
     */
    private _handle() {
        if (this.isHttp2) {
            // TODO: HTTP/2 & HTTP/1.1 fallback event handling.
            //this.http2Server?.on("request", this._handleHTTP2Request.bind(this));
        } else {
            // Handle HTTP/1.1 requests.
            this.http1Server?.on("request", (request, response) => {
                const dataStream = new DataStream();
                request.on("data", (data) => dataStream.write(data));
                request.on("end", () => this._handleHTTP1Request(request, response, dataStream));
            });
        }
    }

    private _handleHTTP1Request(req: http.IncomingMessage, res: http.ServerResponse, data: DataStream) {
        // Split the URL into a path to handle and a query string.
        const url = new URL(req.url ?? "", `http://${req.headers.host}`);
        const path = url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;

        // Parse the request and response into their relevant objects.
        const request = new Request(req, data);
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
                        this._handleLayer(layer, request, response, nextLayer, value);
                    }
                } else {
                    if (layer.absolutePath === path) {
                        this._handleLayer(layer, request, response, nextLayer, value);
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
                            
                            this._handleLayer(layer, request, response, nextLayer, value);
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
    
    private _handleLayer(layer: Layer, request: Request, response: Response, nextLayer: (value?: NextValue) => void, value?: NextValue) {
        // Validate that the request matches the layer's methods.
        if (layer.methods.length > 0 && !layer.methods.includes(request.message.method as RouteMethod)) {
            nextLayer(value);
            return;
        }

        // Handle the request.
        layer.handle(request, response, nextLayer, value);
    }
}