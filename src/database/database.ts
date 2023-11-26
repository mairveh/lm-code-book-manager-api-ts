import { Sequelize, Dialect } from "sequelize";
import { APP_CONFIG } from "../../config";

// TODO: This should be external config
export let sequelize : Sequelize;
//export let sequelize = new Sequelize("postgres://bookshopuser:super-secret-password@127.0.0.1:5432/bookshop");

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
