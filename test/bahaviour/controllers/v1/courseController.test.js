// const { expect } = require('chai');

// const courseController = require('src/controllers/v1/courseController');

// describe('courseController', async () => {
//   describe('create', async () => {
//     it('persists a session study event and return persisted course when an appropricate request body is provided', async () => {
//       const bodyInObject = {
//         sessionId: '85cc4c60-6f44-4a6a-bc24-a104893a5a0f',
//         totalModulesStudied: 1,
//         averageScore: 10.1,
//         timeStudied: 1800000,
//       };
//       const headers = {
//         'x-user-id': 'fd0e31ec-5c96-4933-8400-924ec302a965',
//       };
//       const path = 'api/v1/courses/18ae28f9-1863-4915-9cfc-05c492ea2ea4';
//       const pathParameters = {
//         courseId: '18ae28f9-1863-4915-9cfc-05c492ea2ea4',
//       };

//       const event = {
//         body: JSON.stringify(bodyInObject),
//         headers,
//         path,
//         pathParameters,
//       };
//       const response = await courseController.create(event);
//       const responseBody = JSON.parse(response.body);
//       expect(response.statusCode).equal(201);
//       expect(responseBody).equal({});
//     });

//     it('returns failure when the no user is matched with the ', async () => {
//       const bodyInObject = {
//         sessionId: '85cc4c60-6f44-4a6a-bc24-a104893a5a0f',
//         totalModulesStudied: 1,
//         averageScore: 10.1,
//         timeStudied: 1800000,
//       };
//       const headers = {
//         'x-user-id': 'd7b48a5e-25b2-4baf-bf1a-31311cab66b4',
//       };
//       const path = 'api/v1/courses/18ae28f9-1863-4915-9cfc-05c492ea2ea4';
//       const pathParameters = {
//         courseId: '18ae28f9-1863-4915-9cfc-05c492ea2ea4',
//       };

//       const event = {
//         body: JSON.stringify(bodyInObject),
//         headers,
//         path,
//         pathParameters,
//       };
//       const response = await courseController.create(event);
//       const responseBody = JSON.parse(response.body);
//       expect(response.statusCode).equal(400);
//       expect(responseBody).equal({ message: 'The user is not found' });
//     });

//     it('returns failure when an wrong request body is provided', async () => {
//       const bodyInObject = {
//         sessionId: '85cc4c60-6f44-4a6a-bc24-a104893a5a0f',
//         totalModulesStudied: 1,
//         averageScore: 1000001,
//         timeStudied: 1800000,
//       };
//       const headers = {
//         'x-user-id': 'fd0e31ec-5c96-4933-8400-924ec302a965',
//       };
//       const path = 'api/v1/courses/18ae28f9-1863-4915-9cfc-05c492ea2ea4';
//       const pathParameters = {
//         courseId: '18ae28f9-1863-4915-9cfc-05c492ea2ea4',
//       };

//       const event = {
//         body: JSON.stringify(bodyInObject),
//         headers,
//         path,
//         pathParameters,
//       };
//       const response = await courseController.create(event);
//       const responseBody = JSON.parse(response.body);
//       expect(response.statusCode).equal(400);
//       expect(responseBody).equal({ message: 'The averageScore is out of range' });
//     });
//   });
// });
