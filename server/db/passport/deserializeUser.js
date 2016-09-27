import Models from '../models';

const User = Models.User;
const Book = Models.Book;
const Trade = Models.Trade;

export default (id, done) => {
  User.findById(id, {
    include: [
      Book, 
      {model: Trade, include: [Book] } 
    ],
    order: [[Trade, 'createdAt', 'DESC']]
  })
  .then((user) => {
    done(null, user);
  }).catch(done);
};