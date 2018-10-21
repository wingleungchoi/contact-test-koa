import Router from 'koa-router';

import * as controllers from 'src/controllers';
import { LOG_ENUM } from 'src/enum/log';


const router = new Router();

// mount the routes
const setVersion = version => async (ctx, next) => {
  ctx.state.version = version;
  await next();
};

const apiV1 = new Router();
apiV1.post('/census/groupBy', controllers.api.v1.census.groupBy);

router.use(
  '/api/v1',
  setVersion(LOG_ENUM.VERSION.VERSION_ONE),
  apiV1.routes(),
  apiV1.allowedMethods()
);

export default router;
