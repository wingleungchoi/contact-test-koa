import * as dotenv from 'dotenv';
import * as mysql from 'mysql';
import * as R from 'ramda';
import util from 'util';

import { DEMONGRAPHIC_COLUMNS } from 'src/enum/census';

dotenv.config();

const checkExistingDemographicColumn = (demographicColumn) => {
  const lowercaseDemographicColumn = R.toLower(demographicColumn);
  return R.contains(lowercaseDemographicColumn, DEMONGRAPHIC_COLUMNS);
};

const groupBy = async (demographicColumn) => {
  if (!checkExistingDemographicColumn(demographicColumn)) {
    return {
      success: false,
      error: {
        message: 'No valid params',
        errors: [],
      },
    };
  }
  const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.BIRDTEST_MYSQL_HOST,
    port: process.env.BIRDTEST_MYSQL_PORT,
    user: process.env.BIRDTEST_MYSQL_USER,
    password: process.env.BIRDTEST_MYSQL_PASSWORD,
    database: process.env.BIRDTEST_MYSQL_DATABASE,
  });

  pool.query = util.promisify(pool.query);

  const results = await pool.query(`
    SELECT COUNT(age), ${demographicColumn}, AVG(age)
    FROM census_learn_sql
    GROUP BY ${demographicColumn}
    ORDER BY COUNT(age) DESC
    LIMIT 100
  `);

  pool.end();
  return results;
};

export {
  groupBy
};

export default {
  groupBy,
};
