import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";

const app: Application = express();

// app.use(
//     cors({
//         origin: config.better_auth.app_url!,
//         credentials: true,
//     }),
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/api/v1", IndexRoutes);

export default app;
