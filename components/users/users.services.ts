import crypto from "node:crypto";
import { PrismaClient, users, tweets } from "@prisma/client";
import { CreateUser, UpdateUser } from "../../types/users";

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

  async findFavorites(userId: string): Promise<tweets[]> {
    const favorites: tweets[] =
      await prisma.$queryRaw`SELECT t.id as tweet_id, t.text as text FROM tweets t JOIN users_tweets ut ON ut.tweet_id = t.id JOIN users u ON u.id = ut.user_id WHERE ut.user_id = ${userId} ORDER BY t.created_at ASC`;

    return favorites;
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
