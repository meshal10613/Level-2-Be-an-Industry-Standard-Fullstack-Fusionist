import status from "http-status";
import { Prisma, Specialty } from "../../../generated/prisma/client";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateSpecialtyPayload } from "./specialty.interface";

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
    const specialty = await prisma.specialty.create({
        data: payload,
    });

    return specialty;
};

const getAllSpecialty = async (): Promise<Specialty[]> => {
    return await prisma.specialty.findMany({
        where: {
            isDeleted: false,
        },
    });
};

const deleteSpecialty = async (id: string): Promise<Specialty> => {
    return await prisma.specialty.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
    });
};

const updateSpecialty = async (
    id: string,
    payload: IUpdateSpecialtyPayload,
) => {
    const specialty = await prisma.specialty.findUnique({
        where: {
            id,
        },
    });

    if (!specialty) {
        throw new AppError(
            status.NOT_FOUND,
            `Specialty with id ${id} not found`,
        );
    }

    return await prisma.specialty.update({
        where: {
            id,
        },
        data: payload,
    });
};

export const specialtyService = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty,
    updateSpecialty,
};
