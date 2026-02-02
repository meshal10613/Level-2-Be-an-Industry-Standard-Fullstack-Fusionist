/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Server } from "http";
import app from "./app.js";
import config from "./config/index.js";

(function bootstrap() {
    let server: Server | null = null;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        server = app.listen(config.port, () => {
            console.log(`Server is running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error("Failed to start the server: ", error);
    }
})();
