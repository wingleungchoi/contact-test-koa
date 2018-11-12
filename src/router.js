import Router from 'koa-router';

import * as controllers from 'src/controllers';
import { setV1, setCurrentUser } from 'src/middlewares';


const router = new Router();

const apiV1 = new Router();
apiV1.post('/course/:courseId', controllers.api.v1.course.createStudyEvent);
apiV1.get('/course/:courseId', controllers.api.v1.course.getSummaryOfStudyEvent);

router.use(
  '/api/v1',
  setV1,
  setCurrentUser,
  apiV1.routes(),
  apiV1.allowedMethods()
);

export default router;
