import * as R from 'ramda';
import * as faker from 'faker';
import * as models from 'src/models';

const courseFactory = (factory) => {
  factory.define('course', models.course, (buildOptions = {}) => (
    {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    }
  ));
};

export { courseFactory };
export default { courseFactory, };
