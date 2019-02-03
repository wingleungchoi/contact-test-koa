module.exports = (sequelize, DATA_TYPES) => {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DATA_TYPES.UUID,
      primaryKey: true,
      defaultValue: DATA_TYPES.UUIDV4,
    },
    firstName: {
      type: DATA_TYPES.STRING,
      validate: {
        len: [1, 50],
      },
    },
    lastName: {
      type: DATA_TYPES.STRING,
      validate: {
        len: [1, 50],
      },
    },
    encryptedPhoneNumber: {
      type: DATA_TYPES.STRING,
      validate: {
        len: [1, 100],
      },
    },
  }, {});
  Contact.associate = (models) => {
    // associations can be defined here
  };
  return Contact;
};
