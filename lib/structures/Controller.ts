import { Router } from "./Router";

export abstract class Controller {
    public routes: Router[];

    constructor() {
        this.routes = [];
    }
}