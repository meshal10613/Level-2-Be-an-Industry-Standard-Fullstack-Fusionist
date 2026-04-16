import express, { Application, Request, Response } from "express";
import cron from "node-cron";
import cors from "cors";
import cookieParser from "cookie-parser";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { envVars } from "./app/config/env";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import path from "path";
import qs from "qs";
import { paymentController } from "./app/module/payment/payment.controller";
import { appointmentService } from "./app/module/appointment/appointment.service";
import chalk from "chalk";

const app: Application = express();
app.set("query parser", (str: string) => qs.parse(str));

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

app.use(
    "/webhook",
    express.raw({ type: "application/json" }),
    paymentController.handleStripeWebhookEvent,
);

app.use(
    cors({
        origin: [
            envVars.FRONTEND_URL,
            envVars.BETTER_AUTH_URL,
            "http://localhost:3000",
            "http://localhost:5000",
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use("/api/auth", toNodeHandler(auth));

//? Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

//? Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

cron.schedule("*/30 * * * *", async () => { //? 30 minutes
    const start = Date.now();

    try {
        await appointmentService.cancelUnpaidAppointments();

        console.log(
            chalk.green(
                `[CRON] Job completed successfully in ${Date.now() - start}ms`,
            ),
        );
    } catch (error) {
        console.error(
            chalk.red("[CRON] Failed to cancel unpaid appointments"),
        );
    }
});

app.use("/api/v1", IndexRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
