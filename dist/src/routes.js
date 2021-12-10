"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_router_1 = __importDefault(require("../components/users/users.router"));
class AppRoutes {
    getUserRoutes() {
        return users_router_1.default;
    }
    getTweetRoutes() {
        return true;
    }
}
exports.default = AppRoutes;
