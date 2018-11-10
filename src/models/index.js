const Sequelize = require('sequelize');
const config = require('src/config/config.json')[process.env.NODE_ENV || 'development'];
const user = require('./user');
const course = require('./course');
const session = require('./session');
const courseModule = require('./courseModule');
const userSession = require('./userSession');

const sequelize = (config.use_env_variable)
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);
const DATA_TYPES = Sequelize;

const db = {
  sequelize,
  Sequelize,
  user: user(sequelize, DATA_TYPES),
  course: course(sequelize, DATA_TYPES),
  session: session(sequelize, DATA_TYPES),
  courseModule: courseModule(sequelize, DATA_TYPES),
  userSession: userSession(sequelize, DATA_TYPES),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
