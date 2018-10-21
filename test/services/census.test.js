import * as censusService from 'src/services/census';

import chai from 'chai';

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

    // it('should return 1. number of lines with this value, 2. "age" value average for each different value in this column', async () => {
    //   const result = await censusService.groupBy('education');
    //   const expectResult = [
    //     { column: 'High school graduate', count: 48407, averageAge: '45.0', },
    //     { column: 'Children', count: 47422, averageAge: '7.0', }
    //   ];
    //   expect(result).to.eql(expectResult);
    // });
  });
});
