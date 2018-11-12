import * as R from 'ramda';

import { idExist, isValidUuid } from 'src/libs/validator';
import { formatSequelizeDBErrors, getSequelizeDBErrorMessage, isSequelizeValidationError } from 'src/helpers/db';

const create = async ({ sessionModel, userSessionModel, }, {
  userId,
  courseId,
  sessionId,
  totalModulesStudied,
  averageScore,
  timeStudied,
}) => {
  if (!isValidUuid(userId)) {
    return { success: false, error: { message: 'No valid user', errors: [], }, };
  }

  try {
    // using sequelize vs direct SQL command
    // sequelize: pros easy to maintain cons: extra transaction with DB
    // direct SQL: pros only one transaction with DB
    // direct SQL: cons: a bit more efforts are required to maintain
    const sessions = await sessionModel.findAll({
      limit: 1,
      where: { id: sessionId, courseId, },
    });
    const isIalidSessionIdOrNot = ((R.prop('length', sessions) === 1) && R.is(Array, sessions));
    if (!isIalidSessionIdOrNot) {
      return {
        success: false,
        error: {
          message: 'The session is not belonged to the course',
        },
      };
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
      return { success: true, };
    }
    return {
      success: false,
      error: {
        message: 'Failed in insert user session',
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: isSequelizeValidationError(error) ? getSequelizeDBErrorMessage(error) : 'Failed in insert user session',
        errors: isSequelizeValidationError(error) ? formatSequelizeDBErrors(error.errors) : error,
      },
    };
  }
};

const getSummary = async ({ userSessionModel, }, {
  userId,
  sessionId,
}) => {
  if (!isValidUuid(userId)) {
    return { success: false, error: { message: 'No valid user', errors: [], }, };
  }

  try {
    // using sequelize vs direct SQL command
    // sequelize: pros easy to maintain
    const userSessions = await userSessionModel.findAll({
      where: { userId, sessionId, },
    });
    const isIalidSessionIdOrNot = (R.is(Array, userSessions) && (R.prop('length', userSessions) > 0));
    if (!isIalidSessionIdOrNot) {
      return {
        success: false,
        error: {
          message: 'The user does not take the session',
        },
      };
    }

    return {
      success: true,
      data: {
        totalModulesStudied: R.pipe(
          R.map(userSession => userSession.dataValues.totalModulesStudied),
          R.sum
        )(userSessions),
        averageScore: R.pipe(
          R.map(userSession => Number(userSession.dataValues.averageScore)),
          R.sum,
          R.flip(R.divide)(R.prop('length', userSessions)),
        )(userSessions),
        timeStudied: R.pipe(
          R.map(userSession => Number(userSession.dataValues.timeStudied)),
          R.sum
        )(userSessions),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: isSequelizeValidationError(error) ? getSequelizeDBErrorMessage(error) : 'Failed in find user session-taking records',
        errors: isSequelizeValidationError(error) ? formatSequelizeDBErrors(error.errors) : error,
      },
    };
  }
};

export default {
  create,
  getSummary,
};
