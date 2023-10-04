const express = require('express')
// const passport = require('passport')
const AccessController = require('../../controllers/AccessController')
const asyncHandler = require('../../helpers/asyncHandler')
const { validator, validationSource } = require('../../helpers/validator')
const schema = require('./schema')

const router = express.Router();

router.post('/signIn', validator(schema.signIn, validationSource.BODY), asyncHandler(AccessController.signIn));
router.post('/register', validator(schema.register, validationSource.BODY), asyncHandler(AccessController.register));
router.post('/google',asyncHandler(AccessController.signInWithGoogle))

// router.get("/login/facebook", passport.authenticate("facebook", { scope: ["email"] })); //define the scope to also access the email
// router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] })); //define this scope to have access to the email

// //once permission to exchange data is granted, a callback will be fired
// router.get(
//     "/login/facebook/callback",
//     passport.authenticate("facebook", { failureRedirect: "/auth/facebook" }),
//     // Redirect user back to the mobile app using deep linking
//     (req, res) => {
//         res.redirect(
//             `memcaps://app/login?firstName=${req.user.firstName}/lastName=${req.user.lastName}/email=${req.user.email}`
//         );
//     }
// );

// router.get(
//     "/login/google/callback",
//     passport.authenticate("google", { failureRedirect: "/auth/google" }),
//     // Redirect user back to the mobile app using deep linking
//     (req, res) => {
//         console.log(req.user);
//         res.redirect(
//             `memcaps://app/login?firstName=${req.user.firstName}/lastName=${req.user.lastName}/email=${req.user.email}`
//         );
//     }
// );


module.exports = router;