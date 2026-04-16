"use server";

import { httpClient } from "@/lib/axios/httpClient";

interface IDoctor {
    id: number;
    name: string;
    specialization: string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: string;
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
}

export const getDoctors = async () => {
    const doctors = await httpClient.get<IDoctor[]>("/doctors");
    return doctors;
};
