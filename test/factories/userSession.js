import * as R from 'ramda';
import * as faker from 'faker';
import * as models from 'src/models';

const userSessionFactory = (factory) => {
  factory.define('userSession', models.userSession, (buildOptions = {}) => (
    {
      id: R.propOr(faker.random.uuid(), 'id', buildOptions),
      sessionId: R.prop('sessionId', buildOptions),
      userId: R.prop('userId', buildOptions),
      totalModulesStudied: R.propOr(faker.random.number({ min: 0, max: 10, precision: 1, }), 'totalModulesStudied', buildOptions),
      averageScore: R.propOr(faker.random.number({ min: 0, max: 100, precision: 0.1, }), 'averageScore', buildOptions),
      timeStudied: R.propOr(faker.random.number({ min: 0, max: 3600000, precision: 1, }), 'timeStudied', buildOptions),
      createdAt: R.propOr(new Date(), 'createdAt', buildOptions),
      updatedAt: R.propOr(new Date(), 'updatedAt', buildOptions),
    }
  ));
};

export { userSessionFactory };
export default { userSessionFactory, };
