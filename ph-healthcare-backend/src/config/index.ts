import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config: {
    port: string | undefined;
    database_url: string | undefined;
    better_auth: {
        secret: string | undefined;
        url: string | undefined;
        app_url: string | undefined;
    };
} = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    better_auth: {
        secret: process.env.BETTER_AUTH_SECRET,
        url: process.env.BETTER_AUTH_URL,
        app_url: process.env.APP_URL
    },
};

export default config;
