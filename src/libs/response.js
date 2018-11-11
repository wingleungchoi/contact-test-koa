import { STATUS } from 'src/enum/response';

const setStatus = status => (ctx, payload) => {
  ctx.status = status;
  ctx.body = {
    meta: {
      version: ctx.state.version,
    },
    data: payload,
  };
};

const ok = setStatus(STATUS.OK);
const created = setStatus(STATUS.CREATED);

export default {
  ok,
  created,
  notFound(ctx) {
    ctx.body = {
      meta: {
        status: STATUS.NOT_FOUND,
        version: ctx.state.version,
      },
    };
  },
  error(ctx, error) {
    ctx.status = STATUS.ERROR;
    ctx.body = {
      meta: {
        version: ctx.state.version,
      },
      error: {
        message: error.message,
        errors: error.errors,
      },
    };
  },
};
