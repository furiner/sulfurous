import { Application } from "../server/Application";
import { Router } from "../structures/Router";

export class RouteHandler {
    /**
     * The application that instantiated this handler.
     */
    public application: Application;

    /**
     * The routers that this handler is handling.
     */
    public routers: Router[];
    

    constructor(application: Application) {
        this.application = application;
        this.routers = [];
    }

    /**
     * Adds a router to this handler.
     * @param routePath The route path to handle.
     * @param router The router to handle the route.
     */
    public add(routePath: string, router: Router) {
        router.path = routePath;

        this.routers.push(router);
    }

    /**
     * Finds a router relevant to this route path.
     * @param routePath The route path to handle.
     */
    public find(routePath: string) {
        return this.routers.find((router) => router.path == routePath) ?? null;
    }
}