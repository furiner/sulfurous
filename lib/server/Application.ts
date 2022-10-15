import { DefaultController } from "../controllers/DefaultController";
import { RouteHandler } from "../handlers/RouteHandler";
import { ApplicationOptions } from "../interfaces/ApplicationOptions";
import { Controller } from "../structures/Controller";
import { Router } from "../structures/Router";
import { RouteFunction } from "../structures/types/RouteFunction";
import { Server } from "./Server";

export class Application {
    public options: ApplicationOptions;
    public routes: RouteHandler;
    public server: Server;

    constructor(options?: ApplicationOptions) {
        this.options = options ?? {};
        this.routes = new RouteHandler(this);
        this.server = new Server(this);
    }

    register(routePath: string, route: Controller) {
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
                const routeFunction = controllerObject[method] as RouteFunction;

                if (routeFunction.routeDescriptor) {
                    // Register the route as a route.
                    router.register(routeFunction, routeFunction.routeDescriptor.routePath);
                }
            }
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