import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { doctorService } from "./doctor.service";
import { NextFunction, Request, Response } from "express";

const getAllDoctors = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await doctorService.getAllDoctors();

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctors fetched successfully",
            data: result,
        });
    },
);

// const getDoctorById = catchAsync(
//const updateDoctor = catchAsync(
//const deleteDoctor = catchAsync(

export const doctorController = {
    getAllDoctors,
    // getDoctorById,
    // updateDoctor,
    // deleteDoctor,
};
