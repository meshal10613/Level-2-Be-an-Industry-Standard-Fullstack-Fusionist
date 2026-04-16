"use server";

import { httpClient } from "../lib/axios/httpClient";
import { ISpecialty } from "../types/specialty.types";

export const getAllSpecialties = async () => {
    try {
        const specialties = await httpClient.get<ISpecialty[]>("/specialty");
        return specialties;
    } catch (error) {
        console.log("Error fetching specialties:", error);
        throw error;
    }
}