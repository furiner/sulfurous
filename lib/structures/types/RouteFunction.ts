import { RouteDescriptor } from "../../interfaces/RouteDescriptor";
import { Request } from "../requests/Request";
import { Response } from "../requests/Response";
import { NextValue } from "./NextValue";

export type RouteFunction = {
    (request: Request, response: Response, next?: (value?: NextValue) => void, value?: NextValue): void;
    isRouteFunction?: boolean;
    routeDescriptor?: RouteDescriptor;
}