import { IUser } from "./user.types";

export interface ILoginResponse {
    token: string;
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
