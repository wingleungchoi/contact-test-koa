import Sequelize from 'sequelize';
import * as configs from 'src/config/config.json';
import contact from 'src/models/contact';

const config = configs[process.env.NODE_ENV || 'development'];

const sequelize = (config.use_env_variable)
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);
const DATA_TYPES = Sequelize;

const db = {
  sequelize,
  Sequelize,
  contact: contact(sequelize, DATA_TYPES),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
