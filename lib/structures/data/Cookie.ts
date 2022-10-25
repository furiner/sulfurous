import { CookieData } from "../../interfaces/CookieData";

export class Cookie {
    /**
     * The name of this cookie.
     */
    public name: string;

    /**
     * The content of this cookie.
     */
    public content: string;

    /**
     * The data/options for this cookie.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
     */
    public data: CookieData;

    constructor(name: string, content: string, data?: CookieData) {
        this.name = name;
        this.content = content;
        this.data = data || {};
    }

    /**
     * Converts this cookie to a string.
     */
    public toString(): string {
        return `${this.name}=${this.content}; ${this._dataToString()}`;
    }

    /**
     * Converts the data of this cookie to a string.
     * @private
     */
    private _dataToString(): string {
        return `${this.data.secure ? `Secure;` : "" } ${this.data.httpOnly ? "HttpOnly;" : ""} ${this.data.domain ? `Domain=${this.data.domain};` : ""} ${this.data.path ? `Path=${this.data.path};` : ""} ${this.data.expires ? `Expires=${this.data.expires.toUTCString()};` : ""} ${this.data.sameSite ? `SameSite=${this.data.sameSite};` : ""} `;
    }
}