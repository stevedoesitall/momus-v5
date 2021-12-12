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
				"error": "Bad request.",
				"ok": false
			});
		}
    
		finally {
			console.log("Finished.");
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const user = res.typedLocals.user;
        
			return res.status(200).send({
				data: user,
				"ok": true
			});
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request.",
				"ok": false
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}

	async getFavorites(req: Request, res: Response) {
		try {
			const favorites = await UsersServices.findFavorites(req.params.id);

			if (favorites.length) {
				return res.status(200).send({
					data: favorites,
					"ok": true
				});
			} else {
				return res.status(204).send();
			}
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request.",
				"ok": false
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}

	async getAllUsers(req: Request, res: Response) {
		try {
			const users = res.typedLocals.users;
        
			return res.status(200).send({
				data: users,
				"ok": true
			});
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request.",
				"ok": false
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}

	async patchUser(req: Request, res: Response) {
		try {
			await UsersServices.updateOne(req.body);
        
			return res.status(201).send({
				"ok": true
			});
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request.",
				"ok": false
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
			await UsersServices.deleteOne(req.body.id);
        
			return res.status(201).send({
				"ok": true
			});
		}
        
		catch (error) {
			return res.status(500).send({
				"error": "Bad request.",
				"ok": false
			});
		}
        
		finally {
			console.log("Finished.");
		}
	}
}

export default new UsersController();