import * as R from 'ramda';

import * as DB from 'src/libs/db';
import { DEMONGRAPHIC_COLUMNS } from 'src/enum/census';

const checkExistingDemographicColumn = R.pipe(
  R.toLower,
  R.flip(R.contains)(DEMONGRAPHIC_COLUMNS)
);

const groupBy = async (demographicColumn, pool = DB.pool) => {
  if (!checkExistingDemographicColumn(demographicColumn)) {
    return {
      success: false,
      error: {
        message: 'No valid params',
        errors: [],
      },
    };
  }

  try {
    const results = await pool.query(`
      SELECT \`${demographicColumn}\` as columnValue, COUNT(age) as count, AVG(age) as averageAge
      FROM census_learn_sql
      GROUP BY \`${demographicColumn}\`
      ORDER BY COUNT(age) DESC
      LIMIT 100
    `);

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: R.prop('message', error),
        errors: [],
      },
    };
  }
};

export {
  groupBy
};

export default {
  groupBy,
};
