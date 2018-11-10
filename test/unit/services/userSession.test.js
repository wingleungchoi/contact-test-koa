const chai = require('chai');

const { factory } = require('test/factories');
const Models = require('src/models');
const userSessionService = require('src/services/userSession');

const { expect } = chai;

describe('userSessionService', async () => {
  beforeEach(async () => {
    // clean up factory mock data
  });

  describe('create', async () => {
    it('should return success is true when it succeeds', async () => {
      const user = await factory.create('user');
      const course = await factory.create('course');
      const session = await factory.create('session', {}, { courseId: course.id });
      const result = await userSessionService.create({
        userSessionModel: Models.userSession,
        sessionModel: Models.session,
      }, {
        userId: user.dataValues.id,
        courseId: course.dataValues.id,
        sessionId: session.dataValues.id,
        totalModulesStudied: 2,
        averageScore: 10.1,
        timeStudied: 10.1,
      });
      expect(result.success).to.equal(true);
    });

    it('should return failure when the session does not belong to the course', async () => {
      const user = await factory.create('user');
      const course = await factory.create('course');
      const course2 = await factory.create('course');
      const session = await factory.create('session', {}, { courseId: course.id });
      const result = await userSessionService.create({
        userSessionModel: Models.userSession,
        sessionModel: Models.session,
      }, {
        userId: user.dataValues.id,
        courseId: course2.dataValues.id,
        sessionId: session.dataValues.id,
        totalModulesStudied: 2,
        averageScore: 10.1,
        timeStudied: 10.1,
      });
      expect(result.success).to.equal(false);
      expect(result.message).to.equal('The session is not belonged to the course');
    });

    it('should return failure when the data fails in validation', async () => {
      const user = await factory.create('user');
      const course = await factory.create('course');
      const session = await factory.create('session', {}, { courseId: course.id });
      const result = await userSessionService.create({
        userSessionModel: Models.userSession,
        sessionModel: Models.session,
      }, {
        userId: user.dataValues.id,
        courseId: course.dataValues.id,
        sessionId: session.dataValues.id,
        totalModulesStudied: 2,
        averageScore: 1000000000.1,
        timeStudied: 10.1,
      });
      expect(result.success).to.equal(false);
      expect(result.message).to.equal('Validation error: Validation max on averageScore failed');
    });
  });
});
