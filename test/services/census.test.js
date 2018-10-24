import * as censusService from 'src/services/census';
import { pool } from 'src/libs/db';

import chai from 'chai';
import sinon from 'sinon';

const { expect, } = chai;

describe('censusService', async () => {
  describe('#groupBy(demographicColumn)', async () => {
    it('should return failure when the demographicColumn is wrong', async () => {
      const result = await censusService.groupBy('1=1');
      const expectResult = {
        success: false,
        error: {
          message: 'No valid params',
          errors: [],
        },
      };
      expect(result).to.eql(expectResult);
    });

    it('should return 1. number of lines with this value, 2. "age" value average for each different value in this column', async () => {
      const expectResult = {
        success: true,
        data: [
          {
            columnValue: 'High school graduate',
            count: 42809,
            averageAge: 45.0525,
          },
          {
            columnValue: 'Children',
            count: 41904,
            averageAge: 6.981,
          },
          {
            columnValue: 'Some college but no degree',
            count: 24624,
            averageAge: 40.0483,
          },
          {
            columnValue: 'Bachelors degree(BA AB BS)',
            count: 17593,
            averageAge: 41.9513,
          },
          {
            columnValue: '7th and 8th grade',
            count: 7080,
            averageAge: 52.0922,
          },
          {
            columnValue: '10th grade',
            count: 6672,
            averageAge: 38.4441,
          },
          {
            columnValue: '11th grade',
            count: 6114,
            averageAge: 35.4045,
          },
          {
            columnValue: 'Masters degree(MA MS MEng MEd MSW MBA)',
            count: 5796,
            averageAge: 46.4917,
          },
          {
            columnValue: '9th grade',
            count: 5436,
            averageAge: 35.1508,
          },
          {
            columnValue: 'Associates degree-occup /vocational',
            count: 4778,
            averageAge: 41.8194,
          },
          {
            columnValue: 'Associates degree-academic program',
            count: 3841,
            averageAge: 40.9862,
          },
          {
            columnValue: '5th or 6th grade',
            count: 2915,
            averageAge: 52.5242,
          },
          {
            columnValue: '12th grade no diploma',
            count: 1884,
            averageAge: 37.9427,
          },
          {
            columnValue: '1st 2nd 3rd or 4th grade',
            count: 1575,
            averageAge: 56.6997,
          },
          {
            columnValue: 'Prof school degree (MD DDS DVM LLB JD)',
            count: 1562,
            averageAge: 46.9731,
          },
          {
            columnValue: 'Doctorate degree(PhD EdD)',
            count: 1084,
            averageAge: 49.7528,
          },
          {
            columnValue: 'Less than 1st grade',
            count: 724,
            averageAge: 54.2831,
          }
        ],
      };
      const stub = sinon.stub(pool, 'query').resolves(expectResult.data);
      const result = await censusService.groupBy('education');
      expect(result).to.eql(expectResult);
      stub.restore();
    });
  });
});
