import { Controller } from "../Controller";
import { RouteFunction } from "../types/RouteFunction";
import { RouteMethod } from "../types/RouteMethod";

export function Route(types: RouteMethod[], route?: string) {
    return function (target: Controller, _: string, descriptor: TypedPropertyDescriptor<RouteFunction>) {
        // set route descriptor
        descriptor.value!.routeDescriptor = {
            routePath: route,
            routeMethods: types,
            isMiddleware: false
        };
    }
}