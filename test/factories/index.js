const factoryGirl = require('factory-girl');

const { courseFactory } = require('./course');
const { courseModuleFactory } = require('./courseModule');
const { sessionFactory } = require('./session');
const { userFactory } = require('./user');

const { factory } = factoryGirl;
const adapter = new factoryGirl.SequelizeAdapter();
factory.setAdapter(adapter);

courseFactory(factory);
courseModuleFactory(factory);
sessionFactory(factory);
userFactory(factory);

module.exports = {
  factory,
};
