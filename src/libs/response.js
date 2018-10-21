import { STATUS } from 'src/enum/response';

export default {
  ok(koa, payload) {
    koa.body = {
      meta: {
        status: STATUS.OK,
        version: koa.state.version,
      },
      data: payload,
    };
  },
  notFound(koa) {
    koa.body = {
      meta: {
        status: STATUS.NOT_FOUND,
        version: koa.state.version,
      },
    };
  },
  error(koa, error) {
    koa.body = {
      meta: {
        status: error.status,
        version: koa.state.version,
      },
      error: {
        message: error.message,
        errors: error.errors,
      },
    };
  },
};
