import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import httpStatus from "http-status";
import { RAGService } from "./rag.service";

const ragService = new RAGService();

const getStats = catchAsync(async (req: Request, res: Response) => {
    const result = await ragService.getStats();

    sendResponse(res, {
        success: true,
        httpStatusCode: httpStatus.OK,
        message: "RAG stats retrieved successfully",
        data: result,
    });
});

const ingestDoctors = catchAsync(async (req: Request, res: Response) => {
    const result = await ragService.ingestDoctorsData();

    sendResponse(res, {
        success: true,
        httpStatusCode: httpStatus.OK,
        message: "Doctors data ingestion completed",
        data: result,
    });
});

const queryRag = catchAsync(async (req: Request, res: Response) => {
    const { query, limit, sourceType } = req.body;

    if (!query) {
        return sendResponse(res, {
            success: false,
            httpStatusCode: httpStatus.BAD_REQUEST,
            message: "Query is required",
        });
    }

    const result = await ragService.generateAnswer(
        query,
        limit ?? 5,
        sourceType,
        true,
    );

    sendResponse(res, {
        success: true,
        httpStatusCode: httpStatus.OK,
        message: "Answer generated successfully",
        data: result,
    });
});

export const ragController = {
    getStats,
    ingestDoctors,
    queryRag,
};
