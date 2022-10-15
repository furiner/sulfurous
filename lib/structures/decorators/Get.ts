import { Controller } from "../Controller";
import { RouteFunction } from "../types/RouteFunction";
import { RouteType } from "../types/RouteType";
import { Route } from "./Route";

export function Get(route?: string) {
    return function (target: Controller, _: string, descriptor: TypedPropertyDescriptor<RouteFunction>) {
        // Run the base route decorator.
        Route(RouteType.Get, route)(target, _, descriptor);
    }
}