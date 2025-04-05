import { PrismaClient } from "@prisma/client";
import { fieldEncryptionExtension } from "prisma-field-encryption";

global.prisma =
  global.prisma || new PrismaClient().$extends(fieldEncryptionExtension());

const db = global.prisma;

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}

export { db };
