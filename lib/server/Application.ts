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
import { Integration } from "../structures/Integration";
import { IntegrationEventFunction } from "../structures/types/IntegrationEvent";
import { IntegrationManager } from "../structures/managers/IntegrationManager";

/**
 * A web application, the central focus and forefront of the Sulfurous web framework.
 */
export class Application extends EventEmitter {
    /**
     * The options for this application.
     */
    public options: ApplicationOptions;

    /**
     * The route handler for this application.
     */
    public routes: RouteHandler;

    /**
     * The main server for this application.
     */
    public server: Server;

    /**
     * The integrations registered to this application.
     */
    public integrations: IntegrationManager;

    constructor(options?: ApplicationOptions) {
        super();

        this.routes = new RouteHandler(this);
        this.server = new Server(this);
        this.integrations = new IntegrationManager(this);

        // Merge options with the default options.
        this.options = Object.assign<ApplicationOptions, ApplicationOptions>(DefaultApplicationOptions, options ?? {});

        // Handle integrations.
        for (let integration of this.options.integrations ?? []) {
            // Register the integration.
            this._handleIntegration(integration);
        }
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

    /**
     * Handles an integration.
     * @param integration The integration to register.
     * @private
     */
    _handleIntegration(integration: Integration) {
        // Register all the events for the integration.
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(integration));
        const integrationObject: Record<string, any> = integration;

        for (let method of methods) {
            if (method == "constructor") {
                // Ignore the constructor of the integration.
                continue;
            }

            // Register the event to the integration.
            const eventFunction = integrationObject[method] as IntegrationEventFunction;
            if (eventFunction.eventName !== undefined) {
                integration.on(eventFunction.eventName, eventFunction);
            }
        }

        // Register the integration.
        this.integrations.register(integration);

        // Emit the integration enabled event.
        this.emit("integrationEnable", integration);
        integration.emit("enable", this);
    }
}