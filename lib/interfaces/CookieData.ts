/**
 * All of the possible data that a cookie than hold.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
 */
export interface CookieData {
    secure?: boolean;
    httpOnly?: boolean;
    domain?: string;
    path?: string;
    expires?: Date;
    sameSite?: "Strict" | "Lax" | "None";
}