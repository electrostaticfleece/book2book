import Models from '../models';

const User = Models.User;
const Book = Models.Book;

export default (id, done) => {
  User.findById(id, {include: [Book]}).then((user) => {
    done(null, user);
  }).catch(done);
};