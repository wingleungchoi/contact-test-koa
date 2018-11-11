const config = {
  port: process.env.PORT,
  hostsWhitelist: process.env.HOSTS.split(','),
};

export default config;
