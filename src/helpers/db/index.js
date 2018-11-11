import * as R from 'ramda';

const formatSequelizeDBErrors = errors => R.map(
  R.pick(['path', 'message']),
  errors
);

const getSequelizeDBErrorMessage = error => R.prop('message', error);

const isSequelizeValidationError = error => R.prop('name', error) === 'SequelizeValidationError';

export {
  formatSequelizeDBErrors,
  getSequelizeDBErrorMessage,
  isSequelizeValidationError
};

export default {
  formatSequelizeDBErrors,
  getSequelizeDBErrorMessage,
  isSequelizeValidationError,
};
