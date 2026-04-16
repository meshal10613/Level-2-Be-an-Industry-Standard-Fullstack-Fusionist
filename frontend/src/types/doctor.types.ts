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
    // user: IDoctorUserDetails;
    appointments?: IDoctorAppointmentItem[];
    doctorSchedules?: IDoctorScheduleItem[];
    reviews?: IDoctorReview[];
    specialties?: IDoctorSpecialty[];
    // appointments?: Appointment[];
    // prescriptions?: Prescription[];
    // reviews?: Review[];
    // doctorSchedules?: DoctorSchedules[];
}

export interface ICreateDoctorPayload {
    password: string;
    doctor: {
        name: string;
        email: string;
        contactNumber: string;
        address?: string;
        registrationNumber: string;
        experience?: number;
        gender: Gender.MALE | Gender.FEMALE;
        appointmentFee: number;
        qualification: string;
        currentWorkingPlace: string;
        designation: string;
    };
    specialties: string[];
}

export interface IUpdateDoctorSpecialtyChange {
    specialtyId: string;
    shouldDelete?: boolean;
}

export interface IUpdateDoctorPayload {
    doctor?: {
        name?: string;
        contactNumber?: string;
        address?: string;
        registrationNumber?: string;
        experience?: number;
        gender?: Gender.MALE | Gender.FEMALE;
        appointmentFee?: number;
        qualification?: string;
        currentWorkingPlace?: string;
        designation?: string;
    };
    specialties?: IUpdateDoctorSpecialtyChange[];
}

export interface IDoctorUserDetails {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    status?: string;
    emailVerified?: boolean;
    image?: string;
    isDeleted?: boolean;
    deletedAt?: string | Date | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface IDoctorReview {
    id?: string;
    rating?: number;
    comment?: string;
    patientId?: string;
    createdAt?: string | Date;
}

export interface IDoctorScheduleItem {
    id?: string;
    isBooked?: boolean;
    schedule?: {
        id?: string;
        startDateTime?: string | Date;
        endDateTime?: string | Date;
    };
}

export interface IDoctorAppointmentItem {
    id?: string;
    status?: string;
    createdAt?: string | Date;
    patient?: {
        id?: string;
        name?: string;
        email?: string;
    };
    schedule?: {
        id?: string;
        startDateTime?: string | Date;
        endDateTime?: string | Date;
    };
    prescription?: {
        id?: string;
    } | null;
}

// export interface IDoctorDetails extends IDoctor {
//     user: IDoctorUserDetails;
//     appointments?: IDoctorAppointmentItem[];
//     doctorSchedules?: IDoctorScheduleItem[];
//     reviews?: IDoctorReview[];
// }
