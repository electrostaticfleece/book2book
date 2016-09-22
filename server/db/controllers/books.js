export default function(Models) {
  const Book = Models.Book;
  const sequelize = Models.sequelize;

  function authenticated(user, res) {
    if(!user) {
      return res.status(401).send({message: 'You are not logged in. To add a book log into your account.'});
    }
    return null;
  }

  function associateUser(created, book, id){
    if(created) {
      return book.addUsers([id]);
    }
    return book.hasUser([id])
    .then((association) => {
      if(association) {
        return false;
      } else {
        return book.increment('available', {by: 1})
          .then((book) => {
            book.addUsers([id]);
            return true;
          });
      }
    });
  }

  function removeBook(req, res) {
    const data = req.body;
    if(authenticated(req.user, res)){
      return null;
    }

    sequelize.transaction((t) => {

      return Book.findOne({
        where: {altId: data.altId}
      }, {transaction: t}).then((book) => {
        return book.decrement(
          'available', 
          {
            by: 1,
            transaction: t
          } 
        ).then((book) => {
          return book.removeUser(
            [req.user.id],
            {transaction: t}
          );
        });
      });
    })
    .then(() => {
      res.status(200).send({
        message: 'We have removed your book from the database',
        book: data
      });
      return true;
    })
    .catch(() => {
      res.status(500).send({
        message: 'We were unable to remove your book from the database',
        book: data
      });
      return null;
    });
  }

  function addBook(req, res) {

    const { body: { data } } = req;
    if(authenticated(req.user, res)){
      return null;
    }

    Book.findOrCreate({
      where: {altId: data.altId}, 
      defaults: {...data, available: 1}
    })
    .spread((book, created) => {
      associateUser(created, book, req.user.id)
        .then((book) => {
          if(book) {
            return res.status(200).send({message: 'Your book has been added to our database'});
          } else {
            return res.status(400).send({messge: 'We cannot process your request because you have already added this book to the database'});
          }
        })
        .catch(() => {
          res.status(500).send({message: 'Your book could not be added to the database'});
        });
    });
  }

  function getAllBooks(req, res) {
    const dbQuery = {
      where: {
        available: {
          gt: 0
        }
      },
      order: [['updatedAt', 'DESC']]
    };
    if(req.params.limit) {
      dbQuery.limit = req.params.limit;
    }

    Book.findAll(dbQuery)
    .then((books) => {
      if(books) {
        return res.status(200).send({
          message: 'We have successfully retrieved your books',
          books: books
        });
      } else {
        return res.status(200).send({
          message: 'There are no books currently in the database',
          books: []
        });
      }
    })
    .catch(() => {
      res.status(500).send({message: 'Your book could not be added to the database'});
    });
  }
  
  
  return {
    addBook,
    removeBook,
    getAllBooks
  };
}