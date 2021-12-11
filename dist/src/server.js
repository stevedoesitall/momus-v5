"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_vars_1 = __importDefault(require("../configs/config.vars"));
const { port } = config_vars_1.default;
app_1.default.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
