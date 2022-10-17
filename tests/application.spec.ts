import { expect } from "chai";

import { Application, Controller, DefaultApplicationOptions } from "../lib/index";

describe("Creating a simple application", () => {
    let instance: Application;

    class TestController extends Controller {
        constructor() {
            super();
        }
    }

    it("Should use default configurations when initialized without overwrites", () => {
        instance = new Application();

        expect(instance.options).to.deep.equal(DefaultApplicationOptions);
    })
})