import app from "./app";
import config from "./app/config";

(function bootstrap() {
    try {
        app.listen(config.port, () => {
            console.log(`Server is running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error("Failed to start the server: ", error);
    }
})();
