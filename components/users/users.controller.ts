import { Request, Response } from "express";
import UsersServices from "./users.services";

class UsersController {
	async createUser(req: Request, res: Response) {
		try {
			await UsersServices.createOne(req.body);
    
			return res.status(201).send({
				"ok": true
			});
		}
    
		catch (error) {
			return res.status(500).send({
				"error": "Bad request."
			});
		}
    
		finally {
			console.log("Finished.");
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const user = await UsersServices.findOne(req.params.id, "id");
        
			if (!user) {
				return res.status(404).send({
					"error": "No user found."
				});
			}
        
			return res.status(200).send(user);
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request."
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}

	async getAllUsers(req: Request, res: Response) {
		try {
			const allUsers = await UsersServices.findAll();
        
			if (!allUsers.length) {
				return res.status(404).send({
					"error": "No users found."
				});
			}
        
			return res.status(200).send(allUsers);
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request."
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}

	async patchUser(req: Request, res: Response) {
		try {
			const user = await UsersServices.findOne(req.body.id);
        
			if (!user) {
				return res.status(404).send({
					"error": "No user found."
				});
			}
        
			await UsersServices.updateOne(req.body);
        
			return res.status(201).send({
				"ok": true
			});
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request."
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
			const user = await UsersServices.findOne(req.body.id);
        
			if (!user) {
				return res.status(404).send({
					"error": "No user found."
				});
			}
        
			await UsersServices.deleteOne(req.body.id);
        
			return res.status(201).send({
				"ok": true
			});
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request."
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}
}

export default new UsersController();