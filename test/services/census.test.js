import * as censusService from 'src/services/census';

import chai from 'chai';

const { expect, } = chai;

describe('censusService', async () => {
  describe('#groupBy(demographicFactor)', async () => {
    it('should return 1. number of lines with this value, 2. "age" value average for each different value in this column', async () => {
      const result = await censusService.groupBy('education');
      const expectResult = [
        { column: 'High school graduate', count: 48407, averageAge: '45.0', },
        { column: 'Children', count: 47422, averageAge: '7.0', }
      ];
      expect(result).to.eql(expectResult);
    });
  });
});
