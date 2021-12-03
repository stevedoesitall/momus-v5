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
}
exports.default = new UsersMiddleware();
