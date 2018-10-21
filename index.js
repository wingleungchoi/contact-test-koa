import * as dotenv from 'dotenv';
import Koa from 'koa';

dotenv.config();

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World!';
});

app.listen(3000);
