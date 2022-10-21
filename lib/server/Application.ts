import path from "path";
import { EventEmitter } from "events";

import { DefaultController } from "../controllers/DefaultController";
import { RouteHandler } from "../handlers/RouteHandler";
import { ApplicationOptions, DefaultApplicationOptions } from "../interfaces/ApplicationOptions";
import { Controller } from "../structures/Controller";
import { Router } from "../structures/Router";
import { RouteFunction } from "../structures/types/RouteFunction";
import { WebsocketFunction } from "../structures/types/WebsocketFunction";
import { Util } from "../util/Util";
import { Server } from "./Server";
import { ApplicationEvent } from "../structures/types/ApplicationEvent";

export class Application extends EventEmitter {
    public options: ApplicationOptions;
    public routes: RouteHandler;
    public server: Server;

    constructor(options?: ApplicationOptions) {
        super();

        this.routes = new RouteHandler(this);
        this.server = new Server(this);

        // Merge options with the default options.
        this.options = Object.assign<ApplicationOptions, ApplicationOptions>(DefaultApplicationOptions, options ?? {});
    }

    on(eventName: ApplicationEvent, listener: (...args: any[]) => void): this {
        return super.on(eventName, listener);
    }

    once(eventName: ApplicationEvent, listener: (...args: any[]) => void): this {
        return super.once(eventName, listener);
    }

    register(routePath: string, route: Controller | RouteFunction | WebsocketFunction) {
        // Validate the type of the route provided.
        if (route instanceof Controller) {
            // Parse all of the route middleware into the controller.
            const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(route));
            const controllerObject: Record<string, any> = route;

            for (let method of methods) {
                if (method == "constructor") {
                    // Ignore the constructor of the controller.
                    continue;
                }

                // Ensure there is an applicable router for this path.
                let router = this.routes.find(routePath);

                if (!router) {
                    // Create a new router for this path.
                    router = new Router(routePath);
                    this.routes.add(routePath, router);
                }

                // Register the route to the router.
                if (Util.isRouteFunction(controllerObject[method])) {
                    const routeFunction = controllerObject[method] as RouteFunction;

                    if (routeFunction.routeDescriptor) {
                        // Register the route as a route.
                        router.register(routeFunction, routeFunction.routeDescriptor.routePath);
                    }
                } else if (Util.isWebsocketFunction(controllerObject[method])) {
                    const websocketFunction = controllerObject[method] as WebsocketFunction;

                    // Create a new websocket server for this route.
                    this.server.createWebsocketServer(path.join(routePath, websocketFunction.routeDescriptor?.routePath ?? "/").replace(/\\/g, "/"), websocketFunction);
                }
            }
        } else if (Util.isRouteFunction(route)) {
            // Ensure there is an applicable router for this path.
            let router = this.routes.find(routePath);
            route = route as RouteFunction;

            if (!router) {
                // Create a new router for this path.
                router = new Router(routePath);
                this.routes.add(routePath, router);
            }

            // Register the route to the router.
            router.register(route, route.routeDescriptor?.routePath);
        } else if (Util.isWebsocketFunction(route)) {
            // Create a new websocket server for this route.
            this.server.createWebsocketServer(routePath, route as WebsocketFunction);
        }
    }

    /**
     * Starts the application.
     * @param port The port to listen on.
     */
    listen(port: number) {
        // Register default middlewares.
        this.register("/", new DefaultController());
        
        // Start the web server.
        this.server.start(port);
    }
}