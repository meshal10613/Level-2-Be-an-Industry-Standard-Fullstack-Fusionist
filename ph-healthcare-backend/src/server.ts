/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Server } from "http";
import app from "./app.js";

(function bootstrap() {
    let server: Server | null = null;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        server = app.listen(5000, () => {
            console.log(`Server is running on http://localhost:5000`);
        });
    } catch (error) {
        console.error("Failed to start the server: ", error);
    }
})();
