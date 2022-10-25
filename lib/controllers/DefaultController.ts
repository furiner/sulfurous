import { Controller } from "../structures/Controller";
import { Middleware } from "../structures/decorators/Middleware";
import { Request } from "../structures/requests/Request";
import { Response } from "../structures/requests/Response";
import { Router } from "../structures/Router";
import { NextValue } from "../structures/types/NextValue";

export class DefaultController extends Controller {
    @Middleware()
    defaultErrorMiddleware(req: Request, res: Response, next?: () => void, value?: NextValue) {
        if (value && value instanceof Error) {
            res.send(value.stack).end();
        } else {
            // If there is no error, then we should just call next.
            next!();
        }
    }
}