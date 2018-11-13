export default (sequelize, DATA_TYPES) => {
  const session = sequelize.define('Session', {
    id: {
      type: DATA_TYPES.UUID,
      primaryKey: true,
      defaultValue: DATA_TYPES.UUIDV4,
    },
    courseId: {
      type: DATA_TYPES.UUID,
    },
  }, {});

  session.associate = (models) => {
    // associations can be defined here
    models.session.belongsTo(
      models.course,
      {
        foreignKey: 'courseId',
        as: 'course',
      },
    );

    models.session.hasMany(
      models.courseModule,
      {
        as: { singular: 'courseModule', plural: 'courseModules', },
        foreignKey: 'sessionId',
      },
    );

    models.session.hasMany(
      models.userSession,
      {
        as: { singular: 'userSession', plural: 'userSessions', },
        foreignKey: 'sessionId',
      },
    );
  };

  return session;
};
