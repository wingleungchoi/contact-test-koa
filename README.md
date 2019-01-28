# To start up
- require: PostgreSQL
- require: node verson v8.10.0
- `$ git clone git@github.com:wingleungchoi/contact-test-koa.git`
- `$ cd contact-test-koa`
- `$ npm i`
- `$ cp .env-sample .env`
- update the .env file
- `$ cp src/config/config-sample.json src/config/config.json`
- update src/config/config.json
- `$ NODE_ENV=development node_modules/.bin/sequelize db:create`
- `$ NODE_ENV=development node_modules/.bin/sequelize db:migrate`
- `$ NODE_ENV=development node_modules/.bin/sequelize db:seed:all`
- `$ npm run start`
- Please refer examples folder to test endpoint by CURL

# Steps to test
1. `npm i`
2. `NODE_ENV=test node_modules/.bin/sequelize db:create` // for test DB creation
3. `NODE_ENV=test node_modules/.bin/sequelize db:migrate` // for test DB migration
4. `npm test`

# Building Docker image
- `docker build -t wingleunchoi/contact-test-koa .`

# Run the image
- `docker run -p 80:8080 -d wingleunchoi/contact-test-koa`
