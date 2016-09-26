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

  function updateTrade(req, res){
    const { body: {data: { status, tradeID }} } = req;
    if(authenticated(req.user, res)) {
      return null;
    }

    Trade.update({
      status: status
    }, {
      where: {
        tradeID: tradeID
      }
    })
    .then((count) => {
      if(count > 0 ) {
        res.status(200).send({message: 'Your trade has been successfully updated!'});
      }
    })
    .catch(()=> {
      res.status(500).send({message: 'Something went wrong. We were unable to update the status of your trade'});
    });
  }

  return {
    createTrade,
    updateTrade
  };
}