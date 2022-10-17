
/**
 * The server options that can be provided to the web application instance.
 */
export interface ApplicationOptions {
    /* WEBSOCKET OPTIONS */ 
    /**
     * Whether or not to enable the web application to use websockets.
     * @default true
     */
    websocketEnabled?: boolean;


    /* HTTP/2 OPTIONS */
    /**
     * Tells clients to use HTTP/2.
     * If this is false, the server will only support HTTP/1.1 connections.
     * @defaultValue `false`
     */
    useHttp2?: boolean

    /**
     * Uses the insecure non-TLS form of HTTP/2.
     * 
     * You under no circumstances should be utilizing this or setting it to false unless you understand that:
     * * You will not have a fallback HTTP/1 server due to the nature of browsers not supporting unencrypted HTTP/2.
     * 
     * This option is reserved only for devices that have hardware limitations that render it unable to support TLS.
     * 
     * @defaultValue `false`
     */
    insecureHttp2?: boolean

    /**
     * The path to the key file to use for the HTTP/2 server.
     * 
     * @defaultValue `null`
     */
    key?: string

    /**
     * The path to the certificate file to use for the HTTP/2 server.
     */
    cert?: string
}

export const DefaultApplicationOptions: ApplicationOptions = {
    websocketEnabled: true,
    useHttp2: false,
    insecureHttp2: false,
    key: undefined,
    cert: undefined
}
