/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import * as setEnVar from 'src/libs/setEnvVar';
import Koa from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-body';

import router from 'src/router';
import config from 'src/config/index';

function checkOriginAgainstWhitelist(ctx) {
  const requestOrigin = ctx.accept.headers.origin;
  if (config.hostsWhitelist.indexOf(requestOrigin) === -1) {
    return ctx.throw(`${requestOrigin} is not a valid origin`);
  }
  return requestOrigin;
}

const app = new Koa();

app.use(koaBody({
  multipart: true,
  jsonLimit: '5mb',
  formLimit: '5mb',
}));
app.use(cors({ origin: checkOriginAgainstWhitelist, }));

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  await next();
});

app.use(router.routes());

app.on('error', (err, ctx) => {
  console.error(err);
  /* centralized error handling:
    TODO send email/slack to tech team about error.
    for controlling scope of technical exercise, i did not do this TODO.
  */
});

const server = app.listen(config.port);

console.log(`Listening to Port ${config.port}`);

export {
  server
};

export default {
  server,
};
