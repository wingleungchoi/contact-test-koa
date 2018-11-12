import * as R from 'ramda';
import * as faker from 'faker';
import * as models from 'src/models';

const userFactory = (factory) => {
  factory.define('user', models.user, (buildOptions = {}) => (
    {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    }
  ));
};

export { userFactory };
export default { userFactory, };
