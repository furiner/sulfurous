import { Application } from "../../lib";
import { ExampleIntegration } from "./integration";

const app = new Application({
    integrations: [
        new ExampleIntegration()
    ]
});

app.listen(9000);