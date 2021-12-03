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
			.get("/:id", UsersController.getUser)
			.get("/", UsersController.getAllUsers)
			.patch("/", UsersController.patchUser)
			.delete("/", UsersController.deleteUser);

		return this.router;
	}
}

export default new UsersRouter("/users", express.Router()) as UsersRouter; 