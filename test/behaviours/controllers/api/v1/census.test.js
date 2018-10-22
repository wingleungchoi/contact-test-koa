
import chai from 'chai';
import chaiHttp from 'chai-http';

import { server } from 'index';
import { DEMONGRAPHIC_COLUMNS } from 'src/enum/census';

const { expect, } = chai;
chai.use(chaiHttp);


describe.only('routes: api: v1: census', () => {
  // Here comes the first test
  describe('GET demographicColumns', () => {
    it('should return all the resources', async () => {
      const res = await chai
        .request(server)
        .get('/api/v1/census/demographicColumns');
      expect(res.status).to.eql(200);
      expect(res.type).to.eql('application/json');
      expect(res.body.data).to.eql(DEMONGRAPHIC_COLUMNS);
    });
  });
});
