import { PrismaClient } from "@prisma/client";

global.prisma = global.prisma || new PrismaClient();

const db = global.prisma;

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}

export { db };
