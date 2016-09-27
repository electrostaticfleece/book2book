import passport from 'passport';
import { controllers, passport as passportConfig } from '../db';

function saveSession(req, res) {
  req.session.save((err) => {
    if(err) {
      console.log('Error: unable to save session before redirect');
    } else {
      res.redirect('/');
    }
  });
}

export default (app) => {

  if(controllers && controllers.User){
    app.get('/logout', controllers.User.logOut, saveSession);
    app.put('/user', controllers.User.updateSettings);
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/books'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect: '/'
      }), saveSession);
  }

  if(controllers && controllers.Book) {
    app.post('/books', controllers.Book.addBook);
    app.delete('/books', controllers.Book.removeBook);
    app.get('/books/:limit/:offset', controllers.Book.getAllBooks);
  }

  if(controllers && controllers.Trade) {
    app.post('/trades', controllers.Trade.createTrade);
    app.put('/trades', controllers.Trade.updateTrade, controllers.Trade.findUserTrades);
  }


};