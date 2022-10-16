import { Controller } from "../Controller";
import { RouteFunction } from "../types/RouteFunction";
import { RouteMethod } from "../types/RouteMethod";

export function Middleware(route?: string, methods?: RouteMethod[]) {
    return function (target: Controller | typeof Controller, _: string, descriptor: TypedPropertyDescriptor<RouteFunction>) {
        // set route descriptor
        descriptor.value!.routeDescriptor = {
            routePath: route,
            routeMethods: methods,
            isMiddleware: true,
            isWebsocket: false
        };
    }
}