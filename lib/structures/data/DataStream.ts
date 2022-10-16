import { Transform, TransformCallback } from "stream";

export class DataStream extends Transform {
    /**
     * The output buffer belonging to this stream.
     */
    public buffer: Buffer;

    constructor() {
        super();

        this.buffer = Buffer.alloc(0);
    }

    /**
     * The current length of the buffer.
     */
    get length() {
        return this.buffer.length;
    }

    /**
     * Empties the buffer.
     */
    empty() {
        this.buffer = Buffer.alloc(0);
    }

    /**
     * Ends the stream.
     * @returns The data in this stream as a buffer;
     */
    finish() {
        this.end();

        return this.buffer;
    }

    // INTERNAL METHODS
    
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        let output = Buffer.from(chunk);

        // Output the chunk to the buffer.
        this.buffer = Buffer.concat([this.buffer, output]);
        callback();
    }
}