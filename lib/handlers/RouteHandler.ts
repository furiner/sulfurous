import { Application } from "../server/Application";
import { Router } from "../structures/Router";

export class RouteHandler {
    /**
     * The application that instantiated this handler.
     */
    public application: Application;
    public routers: Router[];
    

    constructor(application: Application) {
        this.application = application;
        this.routers = [];
    }

    /**
     * Adds a router to this handler.
     * @param route The route path to handle.
     */
    add(routePath: string, router: Router) {
        this.routers.push(router);
    }

    /**
     * Finds a router relevant to this route path.
     * @param routePath 
     */
    find(routePath: string) {
        let router: Router | null = null;

        for (let route of this.routers) {
            if (route.path === routePath) {
                router = route;
                break;
            }
        }

        return router;
    }

    /**
     * Handles a request to a route.
     */
    handle(req: Request) {
        
    }

}