import * as R from 'ramda';
import * as faker from 'faker';
import * as models from 'src/models';

const contactFactory = (factory) => {
  factory.define('contact', models.contact, (buildOptions = {}) => (
    {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      firstName: R.propOr(faker.name.firstName(), 'firstName', buildOptions),
      lastName: R.propOr(faker.name.lastName(), 'lastName', buildOptions),
      phoneNumber: R.propOr(faker.phone.phoneNumber(), 'phoneNumber', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    }
  ));
};

export { contactFactory };
export default { contactFactory, };
