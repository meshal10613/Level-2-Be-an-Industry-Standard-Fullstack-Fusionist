import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { userService } from "./user.service";
import { NextFunction, Request, Response } from "express";

const createDoctor = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;
        const result = await userService.createDoctor(payload);
        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Doctor created successfully",
            data: result,
        });
    },
);

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await userService.createAdmin(payload);

    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Admin registered successfully",
        data: result,
    });
});

export const userController = { createDoctor, createAdmin };
