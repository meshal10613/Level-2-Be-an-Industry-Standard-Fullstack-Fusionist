import { toNodeHandler } from "better-auth/node";
import express, { type Application } from "express";
import { auth } from "./lib/auth.js";

const app: Application = express();

app.all("/api/v1/auth/*", toNodeHandler(auth));

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World!");
});

export default app;
