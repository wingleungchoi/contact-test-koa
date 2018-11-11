import Models from 'src/models';
import { LOG_ENUM } from 'src/enum/log';
import { isValidUuid } from 'src/libs/validator';

const setVersion = version => async (ctx, next) => {
  ctx.state.version = version;
  await next();
};

const setV1 = setVersion(LOG_ENUM.VERSION.VERSION_ONE);

const setCurrentUser = async (ctx, next) => {
  const id = ctx.headers['x-user-id'];
  ctx.app.context.currentUser = {};
  if (!isValidUuid(id)) {
    await next();
    return;
  }

  // To control scope of works in test
  // suggest to use JWT in production. in order to unnecssary DB transaction
  try {
    const user = await Models.user.findOne({
      where: { id, },
    });
    ctx.app.context.currentUser = { id: user.id, };
  } catch (error) {
    console.error(error);
  }
  await next();
};

export {
  setV1,
  setCurrentUser
};

export default {
  setV1,
  setCurrentUser,
};
