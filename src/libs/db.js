import * as mysql from 'mysql';
import util from 'util';

import config from 'src/config/index';

const pool = mysql.createPool({
  connectionLimit: config.db.connectionLimit,
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
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
