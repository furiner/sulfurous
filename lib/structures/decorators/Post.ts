import { Controller } from "../Controller";
import { RouteFunction } from "../types/RouteFunction";
import { RouteMethod } from "../types/RouteMethod";
import { Route } from "./Route";

export function Post(route?: string) {
    return function (target: Controller | typeof Controller, _: string, descriptor: TypedPropertyDescriptor<RouteFunction>) {
        // Run the base route decorator.
        Route([ RouteMethod.Post ], route)(target, _, descriptor);
    }
}