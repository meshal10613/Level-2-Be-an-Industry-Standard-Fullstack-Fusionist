import { IDoctor } from "./doctor.types";

export interface ISpecialty {
    id: string;

    title: string;
    description?: string | null;
    icon?: string | null;

    isDeleted: boolean;
    deletedAt?: Date | null;

    // Relation (optional, depending on query)
    doctorSpecialties?: IDoctorSpecialty[];
}

export interface IDoctorSpecialty {
    id: string;

    doctorId: string;
    specialtyId: string;

    // Relations (optional)
    doctor?: IDoctor;
    specialty?: ISpecialty;
}
