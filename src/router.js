import Router from 'koa-router';

import * as controllers from 'src/controllers';
import { setV1, setCurrentUser } from 'src/middlewares';


const router = new Router();

const apiV1 = new Router();
apiV1.post('/courses/:courseId', controllers.api.v1.course.createStudyEvent);
apiV1.get('/courses/:courseId', controllers.api.v1.course.getSummaryOfStudyEventForCourse);
apiV1.get('/courses/:courseId/sessions/:sessionId', controllers.api.v1.course.getSummaryOfStudyEventForSession);

router.use(
  '/api/v1',
  setV1,
  setCurrentUser,
  apiV1.routes(),
  apiV1.allowedMethods()
);

export default router;
