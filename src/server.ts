import { app } from "./app";
import { populateDummyData } from "./database/database_seed";
import { APP_CONFIG } from "../config"

console.log(`🌍 Running in ${APP_CONFIG.nodeEnv} environment`);

app.listen(APP_CONFIG.port, () => {
	console.log(`🚂 Express started on port ${APP_CONFIG.port}`);

	// Seed the database with some data
	if (APP_CONFIG.nodeEnv === "dev") {
		populateDummyData();
	}
});
