export class FileData {
    /**
     * The name of this file.
     */
    public name: string;

    /**
     * The content type of this file.
     */
    public type: string;

    /**
     * The data of this file.
     */
    public data: Buffer;


    constructor(name: string, type: string, data: Buffer) {
        this.name = name;
        this.type = type;
        this.data = data;
    }
}