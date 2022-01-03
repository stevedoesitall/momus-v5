import { Request, Response, NextFunction } from "express";
import { CreateUser, UpdateUser } from "../../types/users";
import UsersServices from "./users.services";

class UsersMiddleware {
  async validateUserIsNew(req: Request, res: Response, next: NextFunction) {
    const reqBody: CreateUser = req.body;
    const user = await UsersServices.findOne(reqBody.user_name, "user_name");

    if (user) {
      return res.status(400).send({
        error: "User already exists."
      });
    }

    next();
  }

  async validateUserExists(req: Request, res: Response, next: NextFunction) {
    if (req.params.id) {
      const userId: string = req.params.id;
      const user = await UsersServices.findOne(userId, "id");

      if (!user) {
        return res.status(404).send({
          error: "User does not exist."
        });
      }

      res.typedLocals = res.locals;
      res.typedLocals.dataObj = user;
    } else {
      const users = await UsersServices.findAll();

      if (!users.length) {
        return res.status(404).send({
          error: "No users found."
        });
      }

      res.typedLocals = res.locals;
      res.typedLocals.dataArr = users;
    }

    next();
  }

  async validateUserFields(req: Request, res: Response, next: NextFunction) {
    const reqBody: CreateUser = req.body;
    const requiredFields: string[] = ["user_name", "password"];
    let providedFields: string[] = Object.keys(reqBody);

    providedFields = providedFields.filter((field) =>
      requiredFields.includes(field)
    );
    const missingFields = requiredFields.filter(
      (field) => !providedFields.includes(field)
    );
    const missingFieldsMsg = missingFields.toString().replaceAll(",", ", ");

    if (providedFields.length !== requiredFields.length) {
      return res.status(400).send({
        error: `Missing required fields: ${missingFieldsMsg}`
      });
    }

    next();
  }

  async validateUserUpdates(req: Request, res: Response, next: NextFunction) {
    const reqBody: UpdateUser = req.body;
    const user = await UsersServices.findOne(reqBody.id, "id");

    if (!user) {
      return res.status(404).send({
        error: "User doesn't exist."
      });
    }

    if (reqBody.user_name) {
      const userNameCheck = await UsersServices.findOne(
        reqBody.user_name,
        "user_name"
      );

      if (userNameCheck) {
        return res.status(400).send({
          error: "Username taken."
        });
      }
    }

    if (reqBody.email) {
      const userEmailCheck = await UsersServices.findOne(
        reqBody.email,
        "email"
      );

      if (userEmailCheck) {
        return res.status(400).send({
          error: "Email taken."
        });
      }
    }

    const allowedUpdates: string[] = [
      "email",
      "password",
      "user_name",
      "favorites"
    ];

    let providedFields: string[] = Object.keys(reqBody);
    providedFields = providedFields.filter((field) =>
      allowedUpdates.includes(field)
    );

    if (!providedFields.length) {
      return res.status(400).send({
        error:
          "Invalid fields. Please provide one of the following to update: email, password, user_name, favorites."
      });
    }

    next();
  }
}

export default new UsersMiddleware();
