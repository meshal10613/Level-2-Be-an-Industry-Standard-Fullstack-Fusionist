import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { patientService } from "./patient.service";
import { IRequestUser } from "../../interface/requestUser.interface";

const updateMyProfile = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IRequestUser;
        const payload = req.body;

        const result = await patientService.updateMyProfile(user, payload);

        sendResponse(res, {
            success: true,
            httpStatusCode: status.OK,
            message: "Profile updated successfully",
            data: result,
        });
    },
);

export const PatientController = {
    updateMyProfile,
};
