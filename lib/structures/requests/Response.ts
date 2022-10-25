import http from "http";
import { CookieData } from "../../interfaces/CookieData";
import { Cookie } from "../data/Cookie";
import { DataStream } from "../data/DataStream";

export class Response {
    /**
     * The outgoing response object.
     */
    public message: http.ServerResponse;

    /**
     * The status code of this response.
     */
    public statusCode?: number;

    /**
     * The headers of this response.
     */
    public headers: Map<string, string | string[]>;
    
    /**
     * The cookies to send alongside this response.
     */
    public cookies: Cookie[];

    /**
     * A writable stream of data to send to the client.
     */
    public stream: DataStream;


    constructor(message: http.ServerResponse) {
        this.message = message;
        this.headers = new Map();
        this.cookies = [];
        this.stream = new DataStream();
    }

    /**
     * Sets the status code of this response.
     * @param statusCode The status code to set.
     */
    status(statusCode: number) {
        this.statusCode = statusCode;

        return this;
    }

    /**
     * Check for whether or not this response has been sent.
     */
    get sent() {
        return this.message.headersSent;
    }

    header(key: string, value: string | string[]) {
        this.headers.set(key, value);

        return this;
    }

    /**
     * Sends a response to the client.
     */
    send(data: any) {
        this.stream.write(data);

        return this;
    }

    /**
     * Sends a JSON object to the client.
     */
    json(data: any) {
        // Empty the current stream.
        this.stream.empty();

        // Write the JSON data to the stream, and set the content type.
        this.header("Content-Type", "application/json");
        this.stream.write(JSON.stringify(data));

        return this;
    }

    /**
     * Ends the response.
     */
    end() {
        // Set certain default headers if they haven't been set already
        if (!this.headers.has("X-Powered-By")) {
            this.header("X-Powered-By", "Sulfurous");
        }

        if (!this.headers.has("Content-Type")) {
            this.header("Content-Type", "text/plain");
        }

        // Set the cookies if any.
        if (this.cookies.length > 0) {
            this.header("Set-Cookie", this.cookies.map(cookie => cookie.toString().split(/(?:\s{1,}?);/g)[0].slice(0, -1)));
        }

        // Set the headers.
        this.message.writeHead(this.statusCode ?? 200, Object.fromEntries(this.headers));

        // Write the content body.
        this.message.write(this.stream.finish());

        // End the response.
        this.message.end();
    }
}