import express, { type Application } from "express";
import { prisma } from "./lib/prisma.js";

const app: Application = express();

app.get("/", async (req, res) => {
    await prisma.user.create({ data: { name: "Alice", email: "a@b.com" } });
    res.send("Hello World!");
});

export default app;
