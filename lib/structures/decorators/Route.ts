import { Controller } from "../Controller";
import { RouteFunction } from "../types/RouteFunction";
import { RouteType } from "../types/RouteType";

export function Route(type: RouteType, route?: string) {
    return function (target: Controller, _: string, descriptor: TypedPropertyDescriptor<RouteFunction>) {
        // set route descriptor
        descriptor.value!.routeDescriptor = {
            routePath: route,
            routeType: RouteType.Get,
            isMiddleware: false
        };
    }
}