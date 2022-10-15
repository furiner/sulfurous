import http from "http";

export class Response {
    /**
     * The status code of this response.
     */
    public statusCode?: number;

    /**
     * The outgoing response object.
     */
    public message: http.ServerResponse;
    
    constructor(message: http.ServerResponse) {
        this.message = message;
    }

    /**
     * Sets the status code of this response.
     * @param statusCode The status code to set.
     */
    status(statusCode: number) {
        this.statusCode = statusCode;
        this.message.statusCode = statusCode;

        return this;
    }

    /**
     * Check for whether or not this response has been sent.
     */
    get sent() {
        return this.message.headersSent;
    }

    /**
     * Sends a response to the client.
     */
    send(data: any) {
        this.message.write(data);

        return this;
    }

    /**
     * Ends the response.
     */
    end() {
        this.message.end();
    }
}