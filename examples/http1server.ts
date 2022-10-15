import { Get } from "../lib/structures/decorators/Get";
import { Middleware } from "../lib/structures/decorators/Middleware";
import { Controller } from "../lib/structures/Controller";
import { Application } from "../lib/server/Application";
import { Request } from "../lib/structures/requests/Request";
import { Response } from "../lib/structures/requests/Response";

const app = new Application({
    useHttp2: false
});

class BasicController extends Controller {
    constructor() {
        super();
    }

    @Middleware()
    middleware(req: Request, res: Response, next?: () => void) {
        next!();
    }

    @Get("/test")
    routeFunction(req: Request, res: Response) {
        throw new Error("hi");
    }
}

app.register("/fuck", new BasicController());
app.listen(9000);