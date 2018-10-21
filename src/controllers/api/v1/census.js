import * as R from 'ramda';
import response from 'src/libs/response';
import * as censusService from 'src/services/census';

const groupBy = async (ctx) => {
  const demographicColumn = R.prop('demographicColumn', ctx.request.body);
  const result = await censusService.groupBy(demographicColumn);
  return (result.success)
    ? response.ok(ctx, (result.data) ? result.data : [])
    : response.error(ctx, (result.error) ? result.error : {});
};

export {
  groupBy
};

export default {
  groupBy,
};
