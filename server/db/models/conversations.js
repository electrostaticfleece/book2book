import crypto from 'crypto';

function setID(conversation) {
  conversation.id = crypto.randomBytes(20).toString('hex');
}

export default (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    convoID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true 
    },
    messages: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
      defaultValue: []
    }
  }, {
    timestamps: true,

    classMethods: {
      associate(models) {

        Conversation.belongsTo(models.Trade, {
          foreignKey: 'convoID',
        });

        Conversation.belongsToMany(models.User, {
          foreignKey: 'convoID',
          through: 'UserConversation'
        });
        
      }
    }
  });

   Conversation.beforeCreate(setID);

  return Conversation;
};