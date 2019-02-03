// import * as R from 'ramda';
import contactService from 'src/services/contact';
import response from 'src/libs/response';
import Models from 'src/models';

const createContact = async (ctx) => {
  const {
    firstName,
    lastName,
    phoneNumber,
  } = ctx.request.body;

  const result = await contactService.create({
    contactModel: Models.contact,
  }, {
    firstName,
    lastName,
    phoneNumber,
  });

  return (result.success)
    ? response.created(ctx, result.body)
    : response.error(ctx, (result.error) ? result.error : {});
};

export default {
  createContact,
};
