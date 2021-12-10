"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterConfig = void 0;
const express_1 = require("express");
class RouterConfig {
    constructor(router = (0, express_1.Router)()) {
        this._name = "";
        this.router = router;
    }
    set name(value) {
        this._name = "/" + value;
    }
    get name() {
        return this._name;
    }
    printSummary() {
        console.log(`${this._name} router running.`);
    }
}
exports.RouterConfig = RouterConfig;
