import crypto from 'crypto';

function setID(trade) {
  trade.id = crypto.randomBytes(20).toString('hex');
}

export default (sequelize, DataTypes) => {
  const Trade = sequelize.define('Trade', {
    tradeID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true 
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
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