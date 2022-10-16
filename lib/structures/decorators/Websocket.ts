import { Controller } from "../Controller";
import { RouteFunction } from "../types/RouteFunction";
import { RouteMethod } from "../types/RouteMethod";
import { WebsocketFunction } from "../types/WebsocketFunction";

export function Websocket(route?: string) {
    return function (target: Controller | typeof Controller, _: string, descriptor: TypedPropertyDescriptor<WebsocketFunction>) {
        // set route descriptor
        descriptor.value!.isWebsocketFunction = true;
        descriptor.value!.routeDescriptor = {
            routePath: route,
            routeMethods: [],
            isMiddleware: false,
            isWebsocket: true
        };
    }
}