import { Sequelize } from "sequelize";
import { sequelize } from "../dbConfig/dbConfig";

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
});

export default User;
