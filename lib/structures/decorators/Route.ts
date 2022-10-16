import { Controller } from "../Controller";
import { RouteFunction } from "../types/RouteFunction";
import { RouteMethod } from "../types/RouteMethod";

export function Route(types: RouteMethod[], route?: string) {
    return function (target: Controller | typeof Controller, _: string, descriptor: TypedPropertyDescriptor<RouteFunction>) {
        // set route descriptor
        descriptor.value!.isRouteFunction = true;
        descriptor.value!.routeDescriptor = {
            routePath: route,
            routeMethods: types,
            isMiddleware: false,
            isWebsocket: false
        };
    }
}