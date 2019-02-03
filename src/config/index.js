const config = {
  port: process.env.PORT,
  hostsWhitelist: process.env.HOSTS.split(','),
  secretSalt: process.env.SECRET_SALT,
};

export default config;
