import { User } from "./user.types";

export interface ILoginResponse {
    token: string;
    accessToken: string;
    refreshToken: string;
    user: User;
}
