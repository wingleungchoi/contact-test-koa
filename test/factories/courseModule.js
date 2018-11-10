const R = require('ramda');
const faker = require('faker');
const models = require('src/models');

const courseModuleFactory = (factory) => {
  factory.define('courseModule', models.courseModule, (buildOptions = {}) => (
    {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      sessionId: R.prop('sessionId', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    }
  ));
};

module.exports = { courseModuleFactory, };
