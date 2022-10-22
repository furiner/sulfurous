import { Application } from "../../server/Application";
import { Integration } from "../Integration";

export class IntegrationManager {
    public application: Application;
    public cache: Map<string, Integration>;

    constructor(application: Application) {
        this.application = application;
        this.cache = new Map();
    }

    emit(event: string, ...args: any[]) {
        for (let integration of this.cache.values()) {
            integration.emit(event, ...args);
        }
    }

    register(integration: Integration) {
        this.cache.set(integration.id, integration);
    }
}