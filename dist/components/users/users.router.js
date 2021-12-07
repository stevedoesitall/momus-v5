"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const common_routes_config_1 = require("../common/common.routes.config");
const users_middleware_1 = __importDefault(require("./users.middleware"));
const users_controller_1 = __importDefault(require("./users.controller"));
class UsersRouter extends common_routes_config_1.CommonRoutesConfig {
    constructor(name, router) {
        super(name);
        this.name = name;
        this.router = router;
    }
    getRoutes() {
        this.router
            .post("/", [users_middleware_1.default.validateUserFields, users_middleware_1.default.validateUserIsNew], users_controller_1.default.createUser)
            .get("/:id", [users_middleware_1.default.validateUserExists], users_controller_1.default.getUser)
            .get("/", [users_middleware_1.default.validateUserExists], users_controller_1.default.getAllUsers)
            .patch("/", [users_middleware_1.default.validateUserExists, users_middleware_1.default.validateUserUpdates], users_controller_1.default.patchUser)
            .delete("/", [users_middleware_1.default.validateUserExists], users_controller_1.default.deleteUser);
        return this.router;
    }
}
exports.default = new UsersRouter("/users", express_1.default.Router());
