export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    altId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    isbn: {
      type: DataTypes.STRING
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    description: {
      type: DataTypes.TEXT,
    },
    available: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: true,

    classMethods: {
      associate(models) {

        Book.belongsToMany(models.User, {
          foreignKey: 'altId',
          through: 'UserBook'
        });

        Book.belongsToMany(models.Trade, {
          foreignKey: 'altId',
          through: 'TradeBook'
        });
        
      }
    }
  });

  return Book;
};
