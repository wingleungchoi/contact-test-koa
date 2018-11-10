module.exports = (sequelize, DATA_TYPES) => {
  const course = sequelize.define('Course', {
    id: {
      type: DATA_TYPES.UUID,
      primaryKey: true,
      defaultValue: DATA_TYPES.UUIDV4,
    },
  }, {});

  course.associate = (models) => {
    // associations can be defined here
    models.course.hasMany(
      models.session,
      {
        as: { singular: 'session', plural: 'sessions' },
        foreignKey: 'courseId',
      },
    );
  };

  return course;
};
