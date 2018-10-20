import * as dotenv from 'dotenv';
import * as mysql from 'mysql';
import util from 'util';

dotenv.config();

const groupBy = async () => {
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
    SELECT COUNT(age), education, AVG(age)
    FROM census_learn_sql
    GROUP BY education
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
