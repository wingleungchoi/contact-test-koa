import * as factoryGirl from 'factory-girl';

import { contactFactory } from 'test/factories/contact';

const { factory, } = factoryGirl;
const adapter = new factoryGirl.SequelizeAdapter();
factory.setAdapter(adapter);

contactFactory(factory);

export {
  factory
};

export default {
  factory,
};
