export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    DOCTOR = "DOCTOR",
    PATIENT = "PATIENT",
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED",
    DELETED = "DELETED",
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
}

export enum BloodGroup {
    A_POSITIVE = "A_POSITIVE",
    A_NEGATIVE = "A_NEGATIVE",
    B_POSITIVE = "B_POSITIVE",
    B_NEGATIVE = "B_NEGATIVE",
    AB_POSITIVE = "AB_POSITIVE",
    AB_NEGATIVE = "AB_NEGATIVE",
    O_POSITIVE = "O_POSITIVE",
    O_NEGATIVE = "O_NEGATIVE",
}

export enum AppointmentStatus {
    SCHEDULED = "SCHEDULED",
    INPROGRESS = "INPROGRESS",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}

export enum PaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID",
}
