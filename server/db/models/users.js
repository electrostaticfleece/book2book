import crypto from 'crypto';

function setID(user) {
  console.log(crypto.randomBytes(20).toString('hex'));
  user.id = crypto.randomBytes(20).toString('hex');
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    google: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,

    classMethods: {
      associate(models) {

        User.hasMany(models.Token, {
          foreignKey: 'userId'
        });

        User.belongsToMany(models.Book, {
          foreignKey: 'id',
          through: 'UserBook'
        });

        User.belongsToMany(models.Trade, {
          foreignKey: 'id',
          through: 'UserTrade'
        });

        User.belongsToMany(models.Conversation, {
          foreignKey: 'id',
          through: 'UserConversation'
        });
        
      }
    },

    instanceMethods: {

      toJSON() {
        return {
          id: this.id,
          email: this.email,
          profile: {
            firstName: this.firstName,
            lastName: this.lastName,
            city: this.city,
            state: this.state,
            picture: this.picture
          }
        };
      }
    }
  });

  User.beforeCreate(setID);

  return User;
};