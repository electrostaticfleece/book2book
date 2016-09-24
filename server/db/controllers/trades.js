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

    User.findAll({
      include: [{
        model: Book,
        where: {altId: data.requestedBook.altId}
      }]})
    .then((user) => {

      const val = Math.floor((user.length*Math.random()));

      return Trade.create({
        status: 'pending',
        requestedby: req.user.id,
        decisionby: user[val].id,
      })
      .then((trade) => {
        trade.addUsers([req.user.id, user[val].id]);
        trade.addBooks([data.requestedBook.altId, data.userBook.altId]);
        return trade;
      })
      .then((trade) => {
        const resObj = {meta: trade, requestedBook: data.requestedBook, userBook: data.userBook};
        res.status(200).send({trade: resObj});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({message: 'There was an error adding your trade to the database.'});
        return null;
      });
    });
  }

  return {
    createTrade
  };
}