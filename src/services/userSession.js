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

module.exports = {
  create,
};
