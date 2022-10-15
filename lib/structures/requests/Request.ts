import { IncomingMessage } from "http";

export class Request {
    /**
     * The incoming message of this request.
     */
    public message: IncomingMessage;

    public parameters: Map<string, string>;
    
    constructor(message: IncomingMessage) {
        this.message = message;
        this.parameters = new Map();
    }
}