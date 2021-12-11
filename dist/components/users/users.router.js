"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_middleware_1 = __importDefault(require("./users.middleware"));
const users_controller_1 = __importDefault(require("./users.controller"));
const config_routes_1 = require("../../configs/config.routes");
const userRouter = new config_routes_1.RouterConfig();
userRouter.name = "users";
userRouter.router
    .post("/", [users_middleware_1.default.validateUserFields, users_middleware_1.default.validateUserIsNew], users_controller_1.default.createUser)
    .get("/:id", [users_middleware_1.default.validateUserExists], users_controller_1.default.getUser)
    .get("/:id/favorites", [users_middleware_1.default.validateUserExists], users_controller_1.default.getFavorites)
    .get("/", [users_middleware_1.default.validateUserExists], users_controller_1.default.getAllUsers)
    .patch("/:id", [users_middleware_1.default.validateUserExists, users_middleware_1.default.validateUserUpdates], users_controller_1.default.patchUser)
    .delete("/:id", [users_middleware_1.default.validateUserExists], users_controller_1.default.deleteUser);
exports.default = userRouter;
