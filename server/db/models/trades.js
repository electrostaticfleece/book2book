import crypto from 'crypto';

function setID(trade) {
  trade.tradeID = crypto.randomBytes(20).toString('hex');
}

export default (sequelize, DataTypes) => {
  const Trade = sequelize.define('Trade', {
    tradeID: {
      type: DataTypes.STRING,
      primaryKey:true 
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    requestedby: {
      type: DataTypes.STRING,
      allowNull: false
    },
    decisionby: {
      type: DataTypes.STRING,
      allowNull: false
    },
    requestedbook: {
      type: DataTypes.STRING
    },
    decisionbook: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true,

    classMethods: {
      associate(models) {

        Trade.belongsToMany(models.User, {
          foreignKey: 'TradeID',
          through: 'UserTrade'
        });

        Trade.belongsToMany(models.Book, {
          foreignKey: 'tradeID',
          through: 'TradeBook'
        });
        
      }
    }
  });

  Trade.beforeCreate(setID);

  return Trade;
};