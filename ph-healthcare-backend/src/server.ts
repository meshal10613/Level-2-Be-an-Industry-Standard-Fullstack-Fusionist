import chalk from "chalk";
import app from "./app";
import { envVars } from "./app/config/env";

(function bootstrap() {
    try {
        app.listen(envVars.PORT, () => {
            console.log(
                chalk.blue(
                    `Server is running on http://localhost:${envVars.PORT}`,
                ),
            );
        });
    } catch (error) {
        console.error("Failed to start the server: ", error);
    }
})();
