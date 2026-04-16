import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { envVars } from "../../config/env";
import status from "http-status";
import { stripe } from "../../config/stripe";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../shared/sendResponse";

const handleStripeWebhookEvent = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const signature = req.headers["stripe-signature"] as string;
        const webhookSecret = envVars.STRIPE.STRIPE_WEBHOOK_SECRET;

        if (!signature || !webhookSecret) {
            return res.status(status.BAD_REQUEST).json({
                message:
                    "Missing Stripe Webhook Signature or Stripe Webhook Secret",
            });
        }

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                webhookSecret,
            );
        } catch (error: any) {
            return res.status(status.BAD_REQUEST).json({
                message: "Invalid Stripe Webhook Signature",
            });
        }

        try {
            const result = await paymentService.handleStripeWebhookEvent(event);
            sendResponse(res, {
                httpStatusCode: status.OK,
                success: true,
                message: result.message,
            });
        } catch (error: any) {
            console.error("Error handling Stripe webhook event:", error);
            sendResponse(res, {
                httpStatusCode: status.INTERNAL_SERVER_ERROR,
                success: false,
                message: "Error handling Stripe webhook event",
            });
        }
    },
);

export const paymentController = { handleStripeWebhookEvent };