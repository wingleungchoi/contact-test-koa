import * as R from 'ramda';

import * as DB from 'src/libs/db';
import { DEMONGRAPHIC_COLUMNS } from 'src/enum/census';

const checkExistingDemographicColumn = (demographicColumn) => {
  const lowercaseDemographicColumn = R.toLower(demographicColumn);
  return R.contains(lowercaseDemographicColumn, DEMONGRAPHIC_COLUMNS);
};

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

  const results = await pool.query(`
    SELECT ${demographicColumn}, COUNT(age) as count, AVG(age) as averageAge
    FROM census_learn_sql
    GROUP BY ${demographicColumn}
    ORDER BY COUNT(age) DESC
    LIMIT 100
  `);

  return {
    success: true,
    data: results,
  };
};

export {
  groupBy
};

export default {
  groupBy,
};
