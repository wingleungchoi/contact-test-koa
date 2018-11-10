module.exports = (sequelize, DATA_TYPES) => {
  const user = sequelize.define('User', {
    id: {
      type: DATA_TYPES.UUID,
      primaryKey: true,
      defaultValue: DATA_TYPES.UUIDV4,
    },
  }, {});

  user.associate = (models) => {
    // associations can be defined here
    models.user.hasMany(
      models.userSession,
      {
        as: { singular: 'userSession', plural: 'userSessions' },
        foreignKey: 'userId',
      },
    );
  };

  return user;
};
