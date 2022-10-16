import { Controller } from "../Controller";
import { RouteFunction } from "../types/RouteFunction";
import { RouteMethod } from "../types/RouteMethod";
import { Route } from "./Route";

export function Get(route?: string) {
    return function (target: Controller, _: string, descriptor: TypedPropertyDescriptor<RouteFunction>) {
        // Run the base route decorator.
        Route([ RouteMethod.Get ], route)(target, _, descriptor);
    }
}