export default function(Models) {
  const User = Models.User;
  const sequelize = Models.sequelize;

  function findById(userId) {
    if(typeof userId === 'string'){
      return User.findById(userId);
    }

    throw new Error('The userID must be a string', '.server/db/controllers/users.js');
  };

  function findOne(arg) {
    if(typeof arg === 'object'){
      return User.findOne(arg);
    }

    throw new Error('Your argument must be an object', '.server/db/controllers/users.js');
  }

  function updateSettings(user, settings) {
    if(typeof user === 'object' && typeof settings === 'object' && user.update && typeof user.update === 'function') {
      return user.update(settings);
    }

    throw new Error('The user and settings must be objects. The user must have an update property', '.server/db/controllers/users.js');
  };

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

  return {
    findById,
    findOne,
    updateSettings,
    createUserWithToken,
    attachGoogleAccount,
    deleteAccount
  }
}