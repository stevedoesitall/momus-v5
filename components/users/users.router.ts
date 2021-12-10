import UsersMiddleware from "./users.middleware";
import UsersController from "./users.controller";
import { RouterConfig } from "../../configs/config.routes";

const userRouter = new RouterConfig();
userRouter.name = "users";
userRouter.router
	.post("/", [ UsersMiddleware.validateUserFields, UsersMiddleware.validateUserIsNew ], UsersController.createUser)
	.get("/:id", [ UsersMiddleware.validateUserExists ], UsersController.getUser)
	.get("/:id/favorites", [ UsersMiddleware.validateUserExists ], UsersController.getFavorites)
	.get("/", [ UsersMiddleware.validateUserExists ], UsersController.getAllUsers)
	.patch("/:id", [ UsersMiddleware.validateUserExists, UsersMiddleware.validateUserUpdates ], UsersController.patchUser)
	.delete("/:id", [ UsersMiddleware.validateUserExists ], UsersController.deleteUser);

export default userRouter;