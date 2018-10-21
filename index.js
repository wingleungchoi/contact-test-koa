/* eslint-disable no-unused-vars */
import * as setEnVar from 'src/libs/setEnvVar';
import Koa from 'koa';
import koaBody from 'koa-body';

import router from 'src/router';

const app = new Koa();

app.use(koaBody({
  multipart: true,
  jsonLimit: '5mb',
  formLimit: '5mb',
}));

app.use(router.routes());

app.listen(3000);
