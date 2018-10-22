import { STATUS } from 'src/enum/response';

export default {
  ok(ctx, payload) {
    ctx.body = {
      meta: {
        status: STATUS.OK,
        version: ctx.state.version,
      },
      data: payload,
    };
  },
  notFound(ctx) {
    ctx.body = {
      meta: {
        status: STATUS.NOT_FOUND,
        version: ctx.state.version,
      },
    };
  },
  error(ctx, error) {
    ctx.body = {
      meta: {
        status: STATUS.ERROR,
        version: ctx.state.version,
      },
      error: {
        message: error.message,
        errors: error.errors,
      },
    };
  },
};
