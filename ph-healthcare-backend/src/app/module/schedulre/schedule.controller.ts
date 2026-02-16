import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { scheduleService } from "./schedule.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { IQueryParams } from "../../interface/query.interface";

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
        const query = req.query;
        const result = await scheduleService.getAllSchedules(
            query as IQueryParams,
        );
        sendResponse(res, {
            success: true,
            httpStatusCode: status.OK,
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
            httpStatusCode: status.OK,
            message: "Schedule fetched successfully",
            data: result,
        });
    },
);

const updateSchedule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {},
);

const deleteSchedule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        await scheduleService.deleteSchedule(id as string);

        sendResponse(res, {
            success: true,
            httpStatusCode: status.OK,
            message: "Schedule deleted successfully",
        });
    },
);

export const scheduleController = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
};
