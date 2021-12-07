import express, { Router } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import UsersMiddleware from "./users.middleware";
import UsersController from "./users.controller";

class UsersRouter extends CommonRoutesConfig {
	router: Router;
	
	constructor(name: string, router: Router) {
		super(name);
		this.name = name;
		this.router = router;
	}

	getRoutes() {
		this.router
			.post("/", [ UsersMiddleware.validateUserFields, UsersMiddleware.validateUserIsNew ], UsersController.createUser)
			.get("/:id", [ UsersMiddleware.validateUserExists ],  UsersController.getUser)
			.get("/", [ UsersMiddleware.validateUserExists ], UsersController.getAllUsers)
			.patch("/", [ UsersMiddleware.validateUserExists, UsersMiddleware.validateUserUpdates ], UsersController.patchUser)
			.delete("/", [ UsersMiddleware.validateUserExists ], UsersController.deleteUser);

		return this.router;
	}
}

export default new UsersRouter("/users", express.Router()) as UsersRouter; 