// const R = require('ramda');

const create = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      result: event,
    }),
  };
  return response;
};

module.exports = {
  create,
};
