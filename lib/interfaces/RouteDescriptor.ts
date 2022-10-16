import { RouteMethod } from "../structures/types/RouteMethod";

export interface RouteDescriptor {
    routePath?: string;
    routeMethods?: RouteMethod[];
    isMiddleware: boolean;
    isWebsocket: boolean;
}