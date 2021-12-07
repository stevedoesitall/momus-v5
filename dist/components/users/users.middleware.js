"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_services_1 = __importDefault(require("./users.services"));
class UsersMiddleware {
    async validateUserIsNew(req, res, next) {
        const reqBody = req.body;
        const user = await users_services_1.default.findOne(reqBody.user_name, "user_name");
        if (user) {
            return res.status(400).send({
                "error": "User already exists."
            });
        }
        next();
    }
    async validateUserExists(req, res, next) {
        if (req.params.id || req.body.id) {
            const userId = req.params.id || req.body.id;
            const user = await users_services_1.default.findOne(userId, "id");
            if (!user) {
                return res.status(404).send({
                    "error": "User does not exist."
                });
            }
            res.locals.user = user;
        }
        else {
            const users = await users_services_1.default.findAll();
            if (!users.length) {
                return res.status(404).send({
                    "error": "No users found."
                });
            }
            res.typedLocals.users = users;
        }
        next();
    }
    async validateUserFields(req, res, next) {
        const reqBody = req.body;
        const requiredFields = ["user_name", "password"];
        let providedFields = Object.keys(reqBody);
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
    async validateUserUpdates(req, res, next) {
        const reqBody = req.body;
        const user = await users_services_1.default.findOne(reqBody.id, "id");
        if (!user) {
            return res.status(404).send({
                "error": "User doesn't exist."
            });
        }
        if (reqBody.user_name) {
            const userNameCheck = await users_services_1.default.findOne(reqBody.user_name, "user_name");
            if (userNameCheck) {
                return res.status(400).send({
                    "error": "Username taken."
                });
            }
        }
        if (reqBody.email) {
            const userEmailCheck = await users_services_1.default.findOne(reqBody.email, "email");
            if (userEmailCheck) {
                return res.status(400).send({
                    "error": "Email taken."
                });
            }
        }
        const allowedUpdates = ["email", "password", "user_name"];
        let providedFields = Object.keys(reqBody);
        providedFields = providedFields.filter(field => allowedUpdates.includes(field));
        if (!providedFields.length) {
            return res.status(400).send({
                "error": "Invalid fields. Please provide one of the following to update: email, password, user_name."
            });
        }
        next();
    }
}
exports.default = new UsersMiddleware();
