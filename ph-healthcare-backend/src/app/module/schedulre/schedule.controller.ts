import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";

const createSchedule = catchAsync(async(req: Request, res: Response, next: NextFunction) => {});

const getAllSchedules = catchAsync(async(req: Request, res: Response, next: NextFunction) => {});

const getScheduleById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {});

const updateSchedule = catchAsync(async(req: Request, res: Response, next: NextFunction) => {});

const deleteSchedule = catchAsync(async(req: Request, res: Response, next: NextFunction) => {});

export const scheduleController = {
    createSchedule,
	getAllSchedules,
	getScheduleById,
	updateSchedule,
	deleteSchedule,
};