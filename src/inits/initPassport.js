// const passport = require('passport')
// const FacebookStrategy = require('passport-facebook')
// const GoogleStrategy = require('passport-google-oauth20')
// const { facebook, google } = require('../config/passportConfig')
// const session = require('cookie-session')

// const initPassport = (app) => {
//     app.use(
//         session({
//             resave: false,
//             saveUninitialized: true,
//             secret: "123",
//         })
//     );

//     app.use(passport.initialize());
//     app.use(passport.session());
// };

// passport.use(
//     new FacebookStrategy(
//         facebook,
//         async (accessToken, refreshToken, profile, done) => {
//             console.log(profile);
//             // done(null, formatFB(profile._json));
//         }
//     )
// );

// passport.use(
//     new GoogleStrategy(
//         google,
//         async (accessToken, refreshToken, profile, done) => {
//             console.log(profile);
//             done(undefined, formatGoogle(profile._json));
//         }
//     )
// );

// passport.serializeUser((user, done) => done(null, user));

// passport.deserializeUser((user, done) => done(null, user));


// const formatGoogle = (profile) => {
//     return {
//         firstName: profile.given_name,
//         lastName: profile.family_name,
//         email: profile.email
//     };
// };
// const formatFB = (profile) => {
//     return {
//         firstName: profile.first_name,
//         lastName: profile.last_name,
//         email: profile.email
//     };
// };

// module.exports = initPassport;