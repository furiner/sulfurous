import { WebSocket } from "ws";

import { Get } from "../lib/structures/decorators/Get";
import { Middleware } from "../lib/structures/decorators/Middleware";
import { Controller } from "../lib/structures/Controller";
import { Application } from "../lib/server/Application";
import { Request } from "../lib/structures/requests/Request";
import { Response } from "../lib/structures/requests/Response";
import { Post } from "../lib/structures/decorators/Post";
import { Websocket } from "../lib/structures/decorators/Websocket";

const app = new Application({
    useHttp2: false,
    websocketEnabled: true
});

class BasicController extends Controller {
    constructor() {
        super();
    }

    @Middleware()
    middleware(req: Request, res: Response, next?: () => void) {
        next!();
    }

    @Websocket("/ws")
    websocket(connection: WebSocket) {
        console.log(connection);
    }

    @Post("/test")
    routeFunction(req: Request, res: Response) {
        res.json({
            test: "test"
        }).end();
    }


    @Get("/hello")
    static routeFunction(req: Request, res: Response) {
        res.json({
            test: "test"
        }).end();
    }
}

app.register("/fuck", new BasicController());
app.register("/test", BasicController.routeFunction);
app.listen(9000);