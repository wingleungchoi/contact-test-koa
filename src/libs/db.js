import * as mysql from 'mysql';
import util from 'util';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.BIRDTEST_MYSQL_HOST,
  port: process.env.BIRDTEST_MYSQL_PORT,
  user: process.env.BIRDTEST_MYSQL_USER,
  password: process.env.BIRDTEST_MYSQL_PASSWORD,
  database: process.env.BIRDTEST_MYSQL_DATABASE,
});

/*
  Pro: pool.query is a shortcut for the
  pool.getConnection() ->
  connection.query() ->
  connection.release() code flow.
  Cons: two calls to pool.query() may use two different connections and run in parallel.
*/
pool.query = util.promisify(pool.query);

export {
  pool
};

export default {
  pool,
};
