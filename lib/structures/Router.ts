import { Layer } from "./Layer";
import { RouteFunction } from "./types/RouteFunction";

export class Router {
    /**
     * The path of this router.
     **/
    public path: string;
    public layers: Layer[];

    constructor(routePath: string) {
        this.path = routePath;
        this.layers = [];
    }

    register(routeFunction: RouteFunction, routePath?: string) {
        // Register the route to the router's layers.
        this.layers.push(new Layer(this, routeFunction, routePath));
    }
}