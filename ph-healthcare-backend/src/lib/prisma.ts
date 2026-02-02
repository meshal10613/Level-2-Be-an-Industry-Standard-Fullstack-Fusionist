import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import config from "../config/index.js";

if (!config.database_url) {
    throw new Error("DATABASE URL is not defined");
}

const connectionString = config.database_url;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
