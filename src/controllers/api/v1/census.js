import * as R from 'ramda';
import response from 'src/libs/response';
import * as censusService from 'src/services/census';
import { DEMONGRAPHIC_COLUMNS } from 'src/enum/census';

const groupBy = async (ctx) => {
  const demographicColumn = R.prop('demographicColumn', ctx.request.body);
  try {
    const result = await censusService.groupBy(demographicColumn);
    return (result.success)
      ? response.ok(ctx, (result.data) ? result.data : [])
      : response.error(ctx, (result.error) ? result.error : {});
  } catch (error) {
    // TODO send email/slack to tech team about error.
    // for control scope of technical exercise, i did not do this TODO.
    return response.error(ctx, {
      message: 'There is something wrong in server. We are fixing it.',
      errors: [],
    });
  }
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
