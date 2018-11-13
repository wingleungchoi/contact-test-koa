'use strict';

module.exports = {
  up: async (queryInterface) => {
    const userId = '416d6d52-dac3-4812-8b7e-3e158d23f10b';
    const courseId = '416d6d52-dac3-4812-8b7e-3e158d23f10d';
    const sessionId = '416d6d52-dac3-4812-8b7e-3e158d23f10c';

    await queryInterface.bulkInsert('Users', [
      {
        id: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

    await queryInterface.bulkInsert('Courses', [
      {
        id: courseId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

    await queryInterface.bulkInsert('Sessions', [
      {
        id: sessionId,
        courseId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

    await queryInterface.bulkInsert('UserSessions', [
      {
        id: '416d6d52-dac3-4812-8b7e-3e158d23f10e',
        sessionId,
        userId,
        totalModulesStudied: 3,
        averageScore: 70.1,
        timeStudied: 180012020,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '416d6d52-dac3-4812-8b7e-3e158d23f10f',
        sessionId,
        userId,
        totalModulesStudied: 6,
        averageScore: 89.1,
        timeStudied: 1800120200,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Cars', null, {});
    await queryInterface.bulkDelete('CarModels', null, {});
  },
};
