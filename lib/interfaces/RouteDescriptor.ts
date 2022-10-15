import { RouteType } from "../structures/types/RouteType";

export interface RouteDescriptor {
    routePath?: string;
    routeType?: RouteType;
    isMiddleware: boolean;
}