import { Request, Response, NextFunction } from "express";
import { CreateUser } from "./users.interface";
import UserServices from "./users.services";

class UsersMiddleware {
	async validateUserIsNew(req: Request, res: Response, next: NextFunction) {
		const reqBody: CreateUser = req.body;
		const user = await UserServices.findOne(reqBody.user_name, "user_name");
		
		if (user) {
			return res.status(400).send({
				"error": "User already exists."
			});
		}
	
		next();
	}

	async validateUserFields(req: Request, res: Response, next: NextFunction) {
		const reqBody: CreateUser = req.body;
		const requiredFields: string[] = [ "user_name", "password" ];
		let providedFields: string[] = Object.keys(reqBody);
	
		providedFields = providedFields.filter(field => requiredFields.includes(field));
		const missingFields = requiredFields.filter(field => !providedFields.includes(field));
		const missingFieldsMsg = missingFields.toString().replaceAll(",", ", ");

		if (providedFields.length !== requiredFields.length) {
			return res.status(400).send({
				"error": `Missing requires fields: ${missingFieldsMsg}`
			});
		}
	
		next();
	}
}

export default new UsersMiddleware();