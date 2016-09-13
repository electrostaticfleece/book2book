export default (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    kind: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    timestamps: false,

    classMethods: {
      associate(models) {
        Token.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });


  return Token;
};
