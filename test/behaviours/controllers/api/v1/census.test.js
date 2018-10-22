import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import { server } from 'index';
import { DEMONGRAPHIC_COLUMNS } from 'src/enum/census';
import { pool } from 'src/libs/db';

const { expect, } = chai;
chai.use(chaiHttp);


describe('routes: api: v1: census', () => {
  describe('GET demographicColumns', () => {
    it('should return alll available demographic columns', async () => {
      const res = await chai
        .request(server)
        .get('/api/v1/census/demographicColumns');
      expect(res.status).to.eql(200);
      expect(res.type).to.eql('application/json');
      expect(res.body.data).to.eql(DEMONGRAPHIC_COLUMNS);
    });
  });

  describe('Post groupBy', () => {
    it('should return the statistics when column is correct', async () => {
      const expectResult = [
        {
          education: 'High school graduate',
          count: 42809,
          averageAge: 45.0525,
        },
        {
          education: 'Children',
          count: 41904,
          averageAge: 6.981,
        },
        {
          education: 'Some college but no degree',
          count: 24624,
          averageAge: 40.0483,
        },
        {
          education: 'Bachelors degree(BA AB BS)',
          count: 17593,
          averageAge: 41.9513,
        },
        {
          education: '7th and 8th grade',
          count: 7080,
          averageAge: 52.0922,
        },
        {
          education: '10th grade',
          count: 6672,
          averageAge: 38.4441,
        },
        {
          education: '11th grade',
          count: 6114,
          averageAge: 35.4045,
        },
        {
          education: 'Masters degree(MA MS MEng MEd MSW MBA)',
          count: 5796,
          averageAge: 46.4917,
        },
        {
          education: '9th grade',
          count: 5436,
          averageAge: 35.1508,
        },
        {
          education: 'Associates degree-occup /vocational',
          count: 4778,
          averageAge: 41.8194,
        },
        {
          education: 'Associates degree-academic program',
          count: 3841,
          averageAge: 40.9862,
        },
        {
          education: '5th or 6th grade',
          count: 2915,
          averageAge: 52.5242,
        },
        {
          education: '12th grade no diploma',
          count: 1884,
          averageAge: 37.9427,
        },
        {
          education: '1st 2nd 3rd or 4th grade',
          count: 1575,
          averageAge: 56.6997,
        },
        {
          education: 'Prof school degree (MD DDS DVM LLB JD)',
          count: 1562,
          averageAge: 46.9731,
        },
        {
          education: 'Doctorate degree(PhD EdD)',
          count: 1084,
          averageAge: 49.7528,
        },
        {
          education: 'Less than 1st grade',
          count: 724,
          averageAge: 54.2831,
        }
      ];
      const stub = sinon.stub(pool, 'query').resolves(expectResult);
      const res = await chai
        .request(server)
        .post('/api/v1/census/groupBy')
        .send({
          demographicColumn: 'class of worker',
        });
      expect(res.status).to.eql(200);
      expect(res.type).to.eql('application/json');
      expect(res.body.data).to.eql(expectResult);
      stub.restore();
    });

    it('should return the error when column is incorrect', async () => {
      const expectResult = {
        meta: {
          status: 400,
          version: '1',
        },
        error: {
          message: 'No valid params',
          errors: [],
        },
      };
      const res = await chai
        .request(server)
        .post('/api/v1/census/groupBy')
        .send({
          demographicColumn: '1=1',
        });
      expect(res.status).to.eql(200);
      expect(res.type).to.eql('application/json');
      expect(res.body).to.eql(expectResult);
    });
  });
});
