import { EventEmitter } from "events";
import { DefaultIntegrationOptions, IntegrationOptions } from "../interfaces/IntegrationOptions";
import { Application } from "../server/Application";

export class Integration extends EventEmitter {
    /**
     * The main ID of the integration
     */
    public id: string;

    constructor(id: string, options: IntegrationOptions = DefaultIntegrationOptions) {
        super();

        this.id = id;
    }
}