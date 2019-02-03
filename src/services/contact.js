import * as R from 'ramda';

import { AesEncrypt, AesDecrypt } from 'src/helpers/encrypt';
import { idExist } from 'src/libs/validator';
import { formatSequelizeDBErrors, getSequelizeDBErrorMessage, isSequelizeValidationError } from 'src/helpers/db';

const create = async ({ contactModel, }, {
  firstName,
  lastName,
  phoneNumber,
}) => {
  try {
    const contact = await contactModel.create({
      firstName,
      lastName,
      encryptedPhoneNumber: AesEncrypt(phoneNumber),
    });
    if (idExist(contact.dataValues)) {
      return {
        success: true,
        body: R.merge(contact.dataValues, {
          phoneNumber: AesDecrypt(contact.dataValues.encryptedPhoneNumber),
        }),
      };
    }
    return {
      success: false,
      error: {
        message: 'Failed in insert Contact',
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: isSequelizeValidationError(error) ? getSequelizeDBErrorMessage(error) : 'Failed in insert Contact',
        errors: isSequelizeValidationError(error) ? formatSequelizeDBErrors(error.errors) : error,
      },
    };
  }
};

export default {
  create,
};
