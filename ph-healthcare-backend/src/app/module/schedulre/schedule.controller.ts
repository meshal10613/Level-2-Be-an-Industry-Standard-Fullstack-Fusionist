import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { scheduleService } from "./schedule.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const createSchedule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await scheduleService.createSchedule(req.body);
        sendResponse(res, {
            success: true,
            httpStatusCode: status.CREATED,
            message: "Schedule created successfully",
            data: result,
        });
    },
);

const getAllSchedules = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await scheduleService.getAllSchedules();
        sendResponse(res, {
            success: true,
            httpStatusCode: status.CREATED,
            message: "Schedules fetched successfully",
            data: result,
        });
    },
);

const getScheduleById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const result = await scheduleService.getScheduleById(id as string);
        sendResponse(res, {
            success: true,
            httpStatusCode: status.CREATED,
            message: "Schedule fetched successfully",
            data: result,
        });
    },
);

const updateSchedule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

const deleteSchedule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

export const scheduleController = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
};
