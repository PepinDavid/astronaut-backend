import { Sequelize } from "sequelize-typescript";
import { models } from "../models";

const sequelize = new Sequelize({
    database: 'eleven_labs',
    dialect: 'sqlite',
    storage: ':memory:',
    models: models,
});

export default sequelize;