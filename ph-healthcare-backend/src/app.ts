import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("api/v1", IndexRoutes);

export default app;
