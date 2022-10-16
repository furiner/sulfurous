import { RouteDescriptor } from "../../interfaces/RouteDescriptor";
import { WebSocket } from "ws";

export type WebsocketFunction = {
    (connection: WebSocket): void;
    isWebsocketFunction?: boolean;
    routeDescriptor?: RouteDescriptor;
}