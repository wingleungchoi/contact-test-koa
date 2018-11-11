// import * as R from 'ramda';
import userSessionService from 'src/services/userSession';
import response from 'src/libs/response';
import Models from 'src/models';

const createStudyEvent = async (ctx) => {
  const { currentUser, } = ctx.app.context;
  const { courseId, } = ctx.params;
  const {
    sessionId,
    totalModulesStudied,
    averageScore,
    timeStudied,
  } = ctx.request.body;

  const result = await userSessionService.create({
    userSessionModel: Models.userSession,
    sessionModel: Models.session,
  }, {
    userId: currentUser.id,
    courseId,
    sessionId,
    totalModulesStudied,
    averageScore,
    timeStudied,
  });

  return (result.success)
    ? response.created(ctx, {})
    : response.error(ctx, (result.error) ? result.error : {});
};

module.exports = {
  createStudyEvent,
};
