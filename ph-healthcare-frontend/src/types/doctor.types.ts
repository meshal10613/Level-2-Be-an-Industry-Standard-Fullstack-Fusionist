import { Gender } from "./enum.types";
import { IDoctorSpecialty } from "./specialty.types";
import { IUser } from "./user.types";

export interface IDoctor {
    id: string;

    name: string;
    email: string;
    profilePhoto?: string | null;
    contactNumber?: string | null;
    address?: string | null;

    isDeleted: boolean;
    deletedAt?: Date | null;

    registrationNumber: string;
    experience: number;
    gender: Gender; // make sure Gender enum is imported
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    averageRating: number;

    createdAt: Date;
    updatedAt: Date;

    userId: string;
    user: IUser;

    // Relations (optional depending on your use case)
    specialties?: IDoctorSpecialty[];
    // appointments?: Appointment[];
    // prescriptions?: Prescription[];
    // reviews?: Review[];
    // doctorSchedules?: DoctorSchedules[];
}
