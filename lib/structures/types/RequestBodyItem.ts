export type RequestBodyItem = {
    [key: string]: RequestBodyItem;
} | string;