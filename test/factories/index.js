import * as factoryGirl from 'factory-girl';

import { courseFactory } from 'test/factories/course';
import { courseModuleFactory } from 'test/factories/courseModule';
import { sessionFactory } from 'test/factories/session';
import { userFactory } from 'test/factories/user';
import { userSessionFactory } from 'test/factories/userSession';

const { factory, } = factoryGirl;
const adapter = new factoryGirl.SequelizeAdapter();
factory.setAdapter(adapter);

courseFactory(factory);
courseModuleFactory(factory);
sessionFactory(factory);
userFactory(factory);
userSessionFactory(factory);

export {
  factory
};

export default {
  factory,
};
