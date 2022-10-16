import { RouteFunction } from "../structures/types/RouteFunction";
import { WebsocketFunction } from "../structures/types/WebsocketFunction";

export class Util {
    constructor() {
        throw new Error("This class cannot be instantiated.");
    }

    static isRouteFunction(func: Function): func is RouteFunction {
        return "isRouteFunction" in func;
    }

    static isWebsocketFunction(func: Function): func is WebsocketFunction {
        return "isWebsocketFunction" in func;
    }
}