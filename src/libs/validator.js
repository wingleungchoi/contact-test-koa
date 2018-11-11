import * as R from 'ramda';

const propertyExist = (property, constructor) => R.pipe(R.prop(property), R.is(constructor));

const isValidUuid = str => R.is(String, str) && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);

const idExist = propertyExist('id', String);

export {
  idExist,
  isValidUuid
};

export default {
  idExist,
  isValidUuid,
};
