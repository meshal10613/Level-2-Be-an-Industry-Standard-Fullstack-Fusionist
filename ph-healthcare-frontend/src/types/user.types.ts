import { Role, UserStatus } from "./enum.types";

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    role: Role;
    status: UserStatus;
    needPasswordChange: boolean;
    isDeleted?: boolean | null;
    deletedAt?: Date | null;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;

    sessions?: Session[];
    accounts?: Account[];
    // patient?: Patient | null;
    // doctor?: Doctor | null;
    // admin?: Admin | null;
}

export interface Session {
    id: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
    userId: string;

    user?: User;
}

export interface Account {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;

    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | null;
    refreshTokenExpiresAt?: Date | null;
    scope?: string | null;
    password?: string | null;

    createdAt: Date;
    updatedAt: Date;

    user?: User;
}
