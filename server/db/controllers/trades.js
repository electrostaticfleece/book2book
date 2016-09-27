export default function(Models){
  const Trade = Models.Trade;
  const User = Models.User;
  const Book = Models.Book;
  const sequelize = Models.sequelize; 

  function authenticated(user, res) {
    if(!user) {
      return res.status(401).send({message: 'You are not logged in. To add a book log into your account.'});
    }
    return null;
  }

  function createTrade(req, res) {
    const { body: { data } } = req;
    if(authenticated(req.user, res)) {
      return null;
    }

    sequelize.transaction((transaction) => {
      return User.findAll({
        include: [{
          model: Book,
          where: {altId: data.requestedBook.altId}
        }], transaction})
        .then((user) => {
          const val = Math.floor((user.length*Math.random()));

          return Trade.create({
            status: 'pending',
            requestedby: req.user.id,
            decisionby: user[val].id,
            requestedbook: data.requestedBook.altId,
            decisionbook: data.userBook.altId
          }, {transaction})
          .then((trade) => {
            return trade.addUsers([
              req.user.id, 
              user[val].id
            ], {transaction})
            .then(() =>{
              return trade.addBooks([
                data.requestedBook.altId, 
                data.userBook.altId
              ], {transaction})
              .then(() => {
                return trade;
              })
              .then((trade) => {
                const resObj = {meta: trade, requestedBook: data.requestedBook, userBook: data.userBook};
                res.status(200).send({trade: resObj});
              });
            });
          });
        });
    })
    .catch(() => {
      res.status(500).send({message: 'There was an error adding your trade to the database.'});
      return null;
    });
  }

  function findUserTrades(req, res) {
    const { user: { id } } = req;

    if(authenticated(req.user, res)){
      return null;
    }

    return Trade.findAll({
      include: [{
        model: User,
        where: {
          id: id
        }
      }, Book],
      order: [['createdAt', 'DESC']]
    })
    .then((trades) => {
      return res.status(200).send({trades});
    })
    .catch(() => {
      res.status(500).send({message: 'There was an error while looking for your trades. Please try again.'});
    });
  }

  function updateTrade(req, res, next){
    const { body: {data: { status, tradeID, trade }} } = req;

    if(authenticated(req.user, res)) {
      return null;
    }

    return Trade.update({
      status: status
    }, {
      where: {
        tradeID: tradeID,
        status: 'pending'
      }
    })
    .then((count) => {

      if(count[0] !== 1 ) {
        throw new Error('There was an error while updating your status');
      } 

      if(status === 'accepted'){
        return Trade.update({
          status: 'canceled'
        }, {
          where: {
            tradeID: {
              $ne: tradeID
            },
            status: 'pending',
            $or: [{
              requestedbook: trade.requestedbook,
              decisionby: trade.decisionby
            }, {
              decisionbook: trade.requestedbook,
              requestedby: trade.decisionby
            }, {
              requestedbook: trade.decisionbook,
              decisionby: trade.requestedby
            }, {
              decisionbook: trade.decisionbook,
              requestedby: trade.requestedby
            }]
          }
        })
        .then(() => {
          return Book.findAll({
            where: {
              $or: [
                {altId: trade.requestedbook},
                {altId: trade.decisionbook}
              ]
            }
          })
          .then((books) => {
            return books.forEach((book) => {
              book.decrement('available', {by: 1})
              .then((book) => {
                const userId = book.altId === trade.requestedBook ? trade.decisionby : trade.requestedby;
                book.removeUser([userId]);
              });
            });
          })
          .then(() => {
            next();
          });
        });
      } else {
        next();
      }
    })
    .catch(()=> {
      res.status(500).send({message: 'Something went wrong. We were unable to update the status of your trade'});
    });
  }

  return {
    createTrade,
    updateTrade,
    findUserTrades
  };
}