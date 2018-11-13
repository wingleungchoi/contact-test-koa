import chai from 'chai';
import chaiHttp from 'chai-http';

import { server } from 'index';
import { factory } from 'test/factories';

const { expect, } = chai;
chai.use(chaiHttp);


describe('routes: api: v1: course', () => {
  describe('Post courses', () => {
    it('should persists a session study event and return 201 header when column is correct', async () => {
      const user = await factory.create('user');
      const course = await factory.create('course');
      const session = await factory.create('session', {}, { courseId: course.dataValues.id, });
      const expectResult = {};
      const res = await chai
        .request(server)
        .post(`/api/v1/course/${course.dataValues.id}`)
        .set('X-User-Id', user.dataValues.id)
        .send({
          sessionId: session.dataValues.id,
          totalModulesStudied: 1,
          averageScore: 10.1,
          timeStudied: 1800000,
        });
      expect(res.status).to.eql(201);
      expect(res.type).to.eql('application/json');
      expect(res.body.data).to.eql(expectResult);
    });

    it('returns failure when the no user is matched with the user input', async () => {
      // const user = await factory.create('user');
      const course = await factory.create('course');
      const session = await factory.create('session', {}, { courseId: course.dataValues.id, });
      const expectResult = {
        meta: {
          version: '1',
        },
        error: {
          message: 'No valid user',
          errors: [],
        },
      };
      const res = await chai
        .request(server)
        .post(`/api/v1/course/${course.dataValues.id}`)
        .set('X-User-Id', 'no valid user')
        .send({
          sessionId: session.dataValues.id,
          totalModulesStudied: 1,
          averageScore: 10.1,
          timeStudied: 1800000,
        });
      expect(res.status).to.eql(400);
      expect(res.type).to.eql('application/json');
      expect(res.body).to.eql(expectResult);
    });

    it('returns failure when an wrong request body is provided', async () => {
      const user = await factory.create('user');
      const course = await factory.create('course');
      const session = await factory.create('session', {}, { courseId: course.dataValues.id, });
      const expectResult = {
        meta: {
          version: '1',
        },
        error: {
          message: 'Validation error: AverageScore must be bewteen 100 and 0',
          errors: [{
            message: 'AverageScore must be bewteen 100 and 0',
            path: 'averageScore',
          }],
        },
      };
      const res = await chai
        .request(server)
        .post(`/api/v1/course/${course.dataValues.id}`)
        .set('X-User-Id', user.dataValues.id)
        .send({
          sessionId: session.dataValues.id,
          totalModulesStudied: 1,
          averageScore: 1000001,
          timeStudied: 1800000,
        });
      expect(res.status).to.eql(400);
      expect(res.type).to.eql('application/json');
      expect(res.body).to.eql(expectResult);
    });
  });

  describe('Get Courses', () => {
    it('should fetches course lifetime statistics', async () => {
      const user = await factory.create('user');
      const course = await factory.create('course');
      const session = await factory.create('session', {}, { courseId: course.dataValues.id, });
      const userSession1 = await factory.create(
        'userSession',
        {},
        { sessionId: session.dataValues.id, userId: user.dataValues.id, }
      );
      const userSession2 = await factory.create(
        'userSession',
        {},
        { sessionId: session.dataValues.id, userId: user.dataValues.id, }
      );
      const expectResult = {
        totalModulesStudied:
          userSession1.dataValues.totalModulesStudied + userSession2.dataValues.totalModulesStudied,
        averageScore: (Number(userSession1.dataValues.averageScore) + Number(userSession2.dataValues.averageScore)) / 2,
        timeStudied: Number(userSession1.dataValues.timeStudied) + Number(userSession2.dataValues.timeStudied),
      };
      const res = await chai
        .request(server)
        .get(`/api/v1/course/${course.dataValues.id}`)
        .set('X-User-Id', user.dataValues.id)
        .send({
          sessionId: session.dataValues.id,
          totalModulesStudied: 1,
          averageScore: 10.1,
          timeStudied: 1800000,
        });
      expect(res.status).to.eql(200);
      expect(res.type).to.eql('application/json');
      expect(res.body.data).to.eql(expectResult);
    });

    it('should return 400 when a user did not take the session', async () => {
      const user = await factory.create('user');
      const course = await factory.create('course');
      const session = await factory.create('session', {}, { courseId: course.dataValues.id, });
      const expectResult = { message: 'The user does not take the course', };
      const res = await chai
        .request(server)
        .get(`/api/v1/course/${course.dataValues.id}`)
        .set('X-User-Id', user.dataValues.id)
        .send({
          sessionId: session.dataValues.id,
          totalModulesStudied: 1,
          averageScore: 10.1,
          timeStudied: 1800000,
        });
      expect(res.status).to.eql(400);
      expect(res.type).to.eql('application/json');
      expect(res.body.error).to.eql(expectResult);
    });
  });
});
