import { EventEmitter } from "events";
import { DefaultIntegrationOptions, IntegrationOptions } from "../interfaces/IntegrationOptions";

export abstract class Integration extends EventEmitter {
    /**
     * The main ID of the integration
     */
    public id: string;
    public options: IntegrationOptions;

    constructor(id: string, options: IntegrationOptions = DefaultIntegrationOptions) {
        super();

        this.id = id;
        this.options = options;
    }
}