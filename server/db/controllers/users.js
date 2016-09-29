export default function(Models) {
  const User = Models.User;
  const Book = Models.Book;
  const Trade = Models.Trade;
  const sequelize = Models.sequelize;


  function authenticated(user, res) {
    if(!user) {
      return res.status(401).send({message: 'You are not logged in. To add a book log into your account.'});
    }
    return null;
  }

  function findById(userId) {
    if(typeof userId === 'string'){
      return User.findById(userId, {include: [Book]});
    }

    throw new Error('The userID must be a string', '.server/db/controllers/users.js');
  }

  function findOne(arg) {
    if(typeof arg === 'object'){
      return User.findOne(arg, {include: [Book]});
    }

    throw new Error('Your argument must be an object', '.server/db/controllers/users.js');
  }

  function createUserWithToken(profile, accessToken, done) {
    if(typeof profile === 'object' && typeof accessToken === 'string') {

      return sequelize.transaction((transaction) =>
        User.create({
          email: profile._json.emails[0].value,
          google: profile.id,
          name: profile.displayName,
          gender: profile._json.gender,
          picture: profile._json.picture
        }, { transaction }).then((user) =>
          user.createToken({
            kind: 'google',
            accessToken
          }, { transaction }).then(() =>
            done(null, user)
          )
        )
      );

    }

    throw new Error('The profile must be an object and the access token must be a string', '.server/db/controllers/users.js');
  }

  /* eslint-disable no-param-reassign */
  function attachGoogleAccount(user, profile, accessToken, done) {
    if(typeof user === 'object' && typeof profile === 'object' && typeof accessToken === 'string') {
      user.google = profile.id;
      user.name = user.name || profile.displayName;
      user.gender = user.gender || profile._json.gender;
      user.picture = user.picture || profile._json.picture;

      return sequelize.transaction((transaction) =>
        user.save({ transaction }).then(() =>
          user.createToken({
            kind: 'google',
            accessToken
          }, { transaction })
        )
      ).then(() =>
        done(null, user, { message: 'Google account has been linked.' })
      );
    }

    throw new Error('The profile and user must be objects and the access token must be a string', '.server/db/controllers/users.js');
  }
  /* eslint-disable no-param-reassign */

  function deleteAccount(user) {
    if(typeof user === 'object' && user.destroy && user.destroy === 'function') {
      return user.destroy();
    }

    throw new Error('The instance of user must be an object and contain a destroy property', '.server/db/controllers/users.js');
  }

  function logOut(req, res , next) {
    // Do email and password validation for the server
    req.logout();
    next();
  }

  function updateSettings(req, res) {
    const { body: { data } } = req;
    console.log(data);
    if(authenticated(req.user, res)) {
      return null;
    }

    return User.update(data, {
      where: {
        id: req.user.id
      }
    })
    .then((count) => {
      if(count[0] === 1){
        res.status(200).send({message: 'Your settings have been successfully updated'});
      }
    })
    .catch(() => {
      res.status(500).send({message: 'Something went wrong. We could not update your settings'});
    });
  }

  function getUserUpdates(req,res) {

    if(authenticated(req.user, res)) {
      return null;
    }

    User.findById(req.user.id, {
      include: [
        Book, 
        {model: Trade, include: [Book] } 
      ],
      order: [[Trade, 'createdAt', 'DESC']]
    })
    .then((user) => {
      res.status(200).send({trades: user.Trades, books: user.Books});
    })
    .catch(() => {
      res.status(500).send({message: 'Cannot get user data at this time'});
    });
  }

  return {
    getUserUpdates,
    updateSettings,
    findById,
    findOne,
    createUserWithToken,
    attachGoogleAccount,
    deleteAccount,
    logOut
  };
}