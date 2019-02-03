import Router from 'koa-router';

import * as controllers from 'src/controllers';
import { setV1, setCurrentUser } from 'src/middlewares';


const router = new Router();

const apiV1 = new Router();
apiV1.post('/contacts', controllers.api.v1.contact.createContact);

router.use(
  '/api/v1',
  setV1,
  setCurrentUser,
  apiV1.routes(),
  apiV1.allowedMethods()
);

export default router;
