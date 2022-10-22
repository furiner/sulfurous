import os from 'os';
import { IncomingMessage } from "http";
import { DataStream } from "../data/DataStream";
import { FileData } from "../data/FileData";
import { RequestBodyItem } from "../types/RequestBodyItem";
import { RouteMethod } from "../types/RouteMethod";

export class Request {
    /**
     * The incoming message of this request.
     */
    public message: IncomingMessage;

    /**
     * The internal buffer data of this request.
     */
    private _buffer: DataStream;

    /**
     * The method of this request.
     */
    public method: RouteMethod;

    /**
     * The headers of this request.
     */
    public headers: Map<string, string | string[] | undefined>;

    /**
     * The route parameters of this request.
     */
    public parameters: Map<string, string>;

    /**
     * The query parameters of this request.
     */
    public query: Map<string, string>;

    /**
     * The body of this request.
     */
    public body: Map<string, RequestBodyItem>;

    /**
     * The files of this request.
     */
    public files: Map<string, FileData>;

    /**
     * The internally held IP address of this request.
     */
    private _ip?: string;

    
    constructor(message: IncomingMessage, data: DataStream) {
        this.message = message;
        this._buffer = data;

        this.method = message.method as RouteMethod;
        
        this.headers = new Map(Object.entries(message.headers));
        this.parameters = new Map();
        this.query = new Map();
        this.body = new Map();
        this.files = new Map();

        // Use X-Forwarded-For if available.
        this._ip = this.headers.get("x-forwarded-for") as string || message.socket.remoteAddress;

        // Handle the request.
        this._handle();
    }

    /**
     * The IP address of this request.
     */
    get ip() {
        return this._ip?.split("::ffff:")[1] || this._ip;
    }

    // INTERNAL METHDODS
    /**
     * Internally handles the request.
     * @private
     */
    _handle() {
        // Parse content body, if possible.
        if (this.message.headers["content-type"] && this.method != RouteMethod.Get && this._buffer.length != 0) {
            let requestBody = this._buffer.finish().toString("utf-8");

            if (this.message.headers["content-type"] == "application/json") {
                // This request has a JSON body.
                try {
                    const json = JSON.parse(requestBody);
                    this.body = new Map(Object.entries(json));
                } catch (e) {
                    // Do nothing.
                }
            } else if (this.message.headers["content-type"] == "application/x-www-form-urlencoded") {
                // This request has a form body.
                const form = new URLSearchParams(requestBody);
                this.body = new Map(form.entries());
            } else if (this.message.headers["content-type"].startsWith("multipart/form-data")) {
                // This request has a multipart form body.
                const boundary = this.message.headers["content-type"].split("=")[1];
                const parts = requestBody.split(`--${boundary}`);
                
                for (const part of parts) {
                    if (part.trim() == "" || part.trim() == "--") {
                        continue;
                    }

                    // Get the lines of this part.
                    const lines = part.split(os.EOL).slice(1, -1);

                    // Get the name of this part.
                    const name = lines[0].split(/;/)[1].slice(7, -1);

                    // Add this part to the body, or files.
                    if (lines[1].startsWith("Content-Type")) {
                        // This part is a file.
                        const content = lines.slice(3).join(os.EOL);
                        const buffer = Buffer.from(content, "utf8");
                    
                        // Get the file name & content type.
                        const fileName = lines[0].split(/;/)[2].slice(11, -1);
                        const contentType = lines[1].split(": ")[1];

                        // Add this file to the files.
                        this.files.set(name, new FileData(fileName, contentType, buffer));
                    } else {
                        // This part is a normal body item.
                        const content = lines.slice(2).join(os.EOL);

                        this.body.set(name, content);
                    }
                }
            }
        }

        // Parse query parameters.
        if (this.message.url) {
            const query = new URLSearchParams(this.message.url.split("?")[1]);
            this.query = new Map(query.entries());
        }
    }
}