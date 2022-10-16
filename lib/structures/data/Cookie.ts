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
    toString() {
        return `${this.name}=${this.content};`;
    }
}