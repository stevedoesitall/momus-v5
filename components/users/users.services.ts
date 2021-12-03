import crypto from "node:crypto";
import { PrismaClient, users } from "@prisma/client";
import { CreateUser, UpdateUser } from "./users.interface";

const prisma = new PrismaClient();

class UsersServices {
	async createOne(data: CreateUser): Promise<users> {
		data.id = "MID-" + crypto.randomUUID();
		const user = await prisma.users.create({ data });
	
		return user;
	}
	
	async findOne(value: string, parameter = "id"): Promise<users | null> {
		const user = await prisma.users.findFirst({
			where: {
				[parameter]: value
			}
		});
	
		return user;
	}

	async findAll(): Promise<users[]> {
		const allUsers: users[] = await prisma.users.findMany();
		return allUsers;
	}

	async updateOne(data: UpdateUser): Promise<users> {
		const user = await prisma.users.update({
			data,
			where: {
				id: data.id
			}
		});
	
		return user;
	}

	async deleteOne(userId: string): Promise<users> {
		const user = await prisma.users.delete({
			where: {
				id: userId
			}
		});
	
		return user;
	}
}

export default new UsersServices();