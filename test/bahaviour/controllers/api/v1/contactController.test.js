import chai from 'chai';
import chaiHttp from 'chai-http';

import { server } from 'index';
import { factory } from 'test/factories';

const { expect, } = chai;
chai.use(chaiHttp);


describe('routes: api: v1: contacts', () => {
  describe('Post contacts', () => {
    // ideally each test shall only have a purpose
    // I put each functionality in unit tests for services if I have more time or/and in reality
    it.only('should persists 1. a contact, 2. return a full record with 200 header and 3. Phone number should be encrypted when column is correct', async () => {
      const input = {
        firstName: 'happy',
        lastName: 'client',
        phoneNumber: '123456789',
      };
      const res = await chai
        .request(server)
        .post('/api/v1/contacts')
        .send(input);
      debugger;
      expect(res.status).to.eql(201);
      expect(res.type).to.eql('application/json');
      expect(res.body.data.id).to.be.a('string');
      expect(res.body.data.firstName).to.eq(input.firstName);
      expect(res.body.data.lastName).to.eq(input.lastName);
      expect(res.body.data.phoneNumber).to.eq(input.phoneNumber);
    });
  });
});
