import Sequelize from 'sequelize';
import * as configs from 'src/config/config.json';
import user from 'src/models/user';
import course from 'src/models/course';
import session from 'src/models/session';
import courseModule from 'src/models/courseModule';
import userSession from 'src/models/userSession';

const config = configs[process.env.NODE_ENV || 'development'];

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
