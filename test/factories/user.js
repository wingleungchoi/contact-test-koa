const R = require('ramda');
const faker = require('faker');
const models = require('src/models');

const userFactory = (factory) => {
  factory.define('user', models.user, (buildOptions = {}) => (
    {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    }
  ));
};

module.exports = { userFactory, };
