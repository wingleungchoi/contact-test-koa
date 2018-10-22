import * as R from 'ramda';
import response from 'src/libs/response';
import * as censusService from 'src/services/census';
import { DEMONGRAPHIC_COLUMNS } from 'src/enum/census';

const groupBy = async (ctx) => {
  const demographicColumn = R.prop('demographicColumn', ctx.request.body);
  const result = await censusService.groupBy(demographicColumn);
  return (result.success)
    ? response.ok(ctx, (result.data) ? result.data : [])
    : response.error(ctx, (result.error) ? result.error : {});
};

const demographicColumns = ctx => response.ok(ctx, DEMONGRAPHIC_COLUMNS);


export {
  groupBy,
  demographicColumns
};

export default {
  groupBy,
  demographicColumns,
};
