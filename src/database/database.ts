import { Sequelize, Dialect } from "sequelize";
import { APP_CONFIG } from "../../config";

// TODO: This should be external config
export let sequelize: Sequelize;
//alternativelty use sequelize = new Sequelize("postgres://[db_username]:[db_pwd]@[db_host]:[db_port]/[table_name]");

if (APP_CONFIG.nodeEnv !== "dev") {
	sequelize = new Sequelize(
		APP_CONFIG.dbName,
		APP_CONFIG.dbUserName,
		APP_CONFIG.dbPassword,
		{
			host: APP_CONFIG.dbHost,
			port: parseInt(APP_CONFIG.dbPort as string),
			dialect: "postgres",
		}
	);
} else {
	sequelize = new Sequelize("sqlite::memory:");
}
