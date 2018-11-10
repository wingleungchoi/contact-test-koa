module.exports = (sequelize, DATA_TYPES) => {
  const courseModule = sequelize.define('CourseModule', {
    id: {
      type: DATA_TYPES.UUID,
      primaryKey: true,
      defaultValue: DATA_TYPES.UUIDV4,
    },
    sessionId: {
      type: DATA_TYPES.UUID,
    },
  }, {});

  courseModule.associate = (models) => {
    // associations can be defined here
    models.courseModule.belongsTo(
      models.session,
      {
        foreignKey: 'sessionId',
        as: 'session',
      },
    );
  };
  return courseModule;
};
