import bookController from './books';
import userController from './users';
import tradeController from './trades';
import Models from '../models';

const Book = bookController(Models);
const User = userController(Models);
const Trade = tradeController(Models);

export { Book, User, Trade };

export default {
  Book, 
  User,
  Trade
};