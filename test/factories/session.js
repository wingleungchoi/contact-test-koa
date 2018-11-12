import * as R from 'ramda';
import * as faker from 'faker';
import * as models from 'src/models';

const sessionFactory = (factory) => {
  factory.define('session', models.session, (buildOptions = {}) => (
    {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      courseId: R.prop('courseId', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    }
  ));
};

export { sessionFactory };
export default { sessionFactory, };
