const config = {
  port: process.env.PORT,
  hostsWhitelist: process.env.HOSTS.split(','),
  db: {
    connectionLimit: 10,
    host: process.env.BIRDTEST_MYSQL_HOST,
    port: process.env.BIRDTEST_MYSQL_PORT,
    user: process.env.BIRDTEST_MYSQL_USER,
    password: process.env.BIRDTEST_MYSQL_PASSWORD,
    database: process.env.BIRDTEST_MYSQL_DATABASE,
  },
};

export default config;
