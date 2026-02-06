import { NextFunction, Request, Response } from "express";
import { specialtyService } from "./specialty.service";

const createSpecialty = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await specialtyService.createSpecialty(req.body);

        res.status(201).json({
            success: true,
            message: "Specialty created successfully",
            data: result,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

const getAllSpecialty = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await specialtyService.getAllSpecialty();
        res.status(200).json({
            success: true,
            message: "Specialty fetched successfully",
            data: result,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

const deleteSpecialty = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;

		const result = await specialtyService.deleteSpecialty(id as string);
		res.status(200).json({
			success: true,
			message: "Specialty deleted successfully",
			data: result,
		})
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

export const specialtyController = {
    createSpecialty,
    getAllSpecialty,
	deleteSpecialty,
};
