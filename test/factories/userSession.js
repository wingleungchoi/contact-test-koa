const R = require('ramda');
const faker = require('faker');
const models = require('src/models');

const userSessionFactory = (factory) => {
  factory.define('userSession', models.userSession, (buildOptions = {}) => (
    {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      sessionId: R.prop('sessionId', buildOptions),
      userId: R.prop('userId', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    }
  ));
};

module.exports = { userSessionFactory, };
