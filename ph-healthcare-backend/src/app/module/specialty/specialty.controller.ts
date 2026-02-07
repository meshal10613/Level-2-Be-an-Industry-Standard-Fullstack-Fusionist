import { NextFunction, Request, Response } from "express";
import { specialtyService } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";

const createSpecialty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await specialtyService.createSpecialty(req.body);
        res.status(200).json({
            success: true,
            message: "Specialty created successfully",
            data: result,
        });
    },
);

const getAllSpecialty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await specialtyService.getAllSpecialty();
        res.status(200).json({
            success: true,
            message: "Specialty fetched successfully",
            data: result,
        });
    },
);

const deleteSpecialty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const result = await specialtyService.deleteSpecialty(id as string);
        res.status(200).json({
            success: true,
            message: "Specialty deleted successfully",
            data: result,
        });
    },
);

export const specialtyController = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty,
};
