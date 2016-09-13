import { User } from '../controllers';

const existingGoogleAccountMessage = [
  'There is already a Google account that belongs to you.',
  'Sign in with that account or delete it, then link it with your current account.'
].join(' ');

const existingEmailUserMessage = [
  'There is already an account using this email address.',
  'Sign in to that account and link it with Google manually from Account Settings.'
].join(' ');

export default (req, accessToken, refreshToken, profile, done) =>
  User.findOne({
    where: { google: profile.id }
  }).then((existingUser) => {
    if (req.user) {
      //If the user is logged in and a profileID exists, prompt the user to sign in with that account and link it with their current account. 
      if (existingUser) {
        return done(null, false, { message: existingGoogleAccountMessage });
      }
      //If the user is logged in, but a profileID does not exist for the user, attach the google account.
      return User.findById(req.user.id).then((user) =>
        User.attachGoogleAccount(user, profile, accessToken, done)
      );
    }

    //If the user is not logged in and there is an existing profileID, sign the user in. 
    if (existingUser) return done(null, existingUser);

    return User.findOne({
      where: { email: profile._json.emails[0].value }
    }).then((existingEmailUser) => {
      /*
       * If a profileID does not exists and an email does that can be found in the db, let the user
       * know that an existing email has been found and to link the profile manually. 
       */
      if (existingEmailUser) {
        return done(null, false, { message: existingEmailUserMessage });
      }
      //If no email or profile ID can be found for the user create a new account with the access token. 
      return User.createUserWithToken(profile, accessToken, done);
    });
  }).catch((err) => {
    console.log(err);
    return done(null, false, { message: 'Something went wrong trying to authenticate' });
  });