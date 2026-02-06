import { Prisma, Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpecialty = async (payload: Prisma.SpecialtyCreateInput): Promise<Specialty> => {
    return await prisma.specialty.create({
        data: payload,
    });
};

const getAllSpecialty = async (): Promise<Specialty[]> => {
    return await prisma.specialty.findMany();
};

const deleteSpecialty = async (id: string): Promise<Specialty> => {
    return await prisma.specialty.delete({
        where: {
            id,
        },
    });
}

export const specialtyService = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty,
};
