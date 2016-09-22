import bookController from './books';
import userController from './users';
import Models from '../models';

const Book = bookController(Models);
const User = userController(Models);

export { Book, User };

export default {
  Book, 
  User
};