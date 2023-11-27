import { Sequelize } from "sequelize";

// TODO: This should be external config
export const sequelize = new Sequelize("sqlite::memory:");
