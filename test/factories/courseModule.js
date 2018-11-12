import * as R from 'ramda';
import * as faker from 'faker';
import * as models from 'src/models';

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

export { courseModuleFactory };
export default { courseModuleFactory, };
