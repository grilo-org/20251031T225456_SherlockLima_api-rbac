import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectToDatabase() {
  await prisma.$connect();
  console.log("Conectado ao banco de dados utilizando prisma!");
}
