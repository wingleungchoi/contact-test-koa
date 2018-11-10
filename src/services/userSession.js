const R = require('ramda');

const idExist = R.pipe(R.prop('id'), R.is(String));

const create = async ({ sessionModel, userSessionModel }, {
  userId,
  courseId,
  sessionId,
  totalModulesStudied,
  averageScore,
  timeStudied,
}) => {
  try {
    // using sequelize vs direct SQL command
    // sequelize: pros easy to maintain cons: extra transaction with DB
    // direct SQL: pros only one transaction with DB
    // direct SQL: cons: a bit more efforts are required to maintain
    const sessions = await sessionModel.findAll({
      limit: 1,
      where: { id: sessionId, courseId },
    });
    const isIalidSessionIdOrNot = ((R.prop('length', sessions) === 1) && R.is(Array, sessions));
    if (!isIalidSessionIdOrNot) {
      return { success: false, message: 'The session is not belonged to the course' };
    }

    const userSession = await userSessionModel.create({
      userId,
      courseId,
      sessionId,
      totalModulesStudied,
      averageScore,
      timeStudied,
    });
    if (idExist(userSession.dataValues)) {
      return { success: true };
    }
    return { success: false, message: 'Failed in insert user session' };
  } catch (error) {
    return { success: false, message: R.propOr('Failed in insert user session', 'message', error) };
  }
};

module.exports = {
  create,
};
