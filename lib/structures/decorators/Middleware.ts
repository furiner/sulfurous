import { Controller } from "../Controller";
import { RouteFunction } from "../types/RouteFunction";

export function Middleware(route?: string) {
    return function (target: Controller, _: string, descriptor: TypedPropertyDescriptor<RouteFunction>) {
        // set route descriptor
        descriptor.value!.routeDescriptor = {
            routePath: route,
            isMiddleware: true
        };
    }
}