import { UserRole } from "../lib/authUtils";
import { Role, UserStatus } from "./enum.types";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface IUser {
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
    accounts?: IAccount[];
    // patient?: Patient;
    // doctor?: Doctor;
    // admin?: Admin;
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

    user?: IUser;
}

export interface IAccount {
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

    user?: IUser;
}
