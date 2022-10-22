import { Integration, IntegrationEvent, Request } from "../../lib";

export class ExampleIntegration extends Integration {
    constructor() {
        super("example_integration");
    }

    @IntegrationEvent("enable")
    public onEnable() {
        console.log("Integration enabled!");
    }

    @IntegrationEvent("request")
    public onRequest(request: Request) {
        console.log("Request received!");
    }
}