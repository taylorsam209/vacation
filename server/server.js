require("dotenv").config();
const express = require("express"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    massive = require("massive"),
    passport = require("passport"),
    Auth0Strategy = require("passport-auth0"),
    cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.use(
//     session({
//         secret: process.env.SECRET,
//         resave: false,
//         saveUninitialized: true
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// massive(process.env.CONNECTION_STRING).then(db => {
//     app.set("db", db);
// });

// passport.use(
//     new Auth0Strategy(
//         {
//             domain: process.env.AUTH_DOMAIN,
//             clientID: process.env.AUTH_CLIENT_ID,
//             clientSecret: process.env.AUTH_CLIENT_SECRET,
//             callbackURL: process.env.CALLBACK_URL
//         },
//         function (accessToken, refreshToken, extraParams, profile, done) {
//             const db = app.get("db");
//             console.log(profile.nickname);
//             db.find_user([profile.emails[0].value]).then(user => {
//                 console.log(user[0]);
//                 if (user[0]) {
//                     return done(null, user[0].user_id);
//                 } else {
//                     const user = profile._json;
//                     db.create_user([user.email, user.name]).then(user => {
//                         return done(null, user[0].user_id);
//                     });
//                 }
//             });
//         }
//     )
// );


// app.get("/auth", passport.authenticate("auth0"));
// app.get(
//     "/auth/callback",
//     passport.authenticate("auth0", {
//         successRedirect: "http://localhost:3000/#/",
//         failureRedirect: "/auth"
//     })
// );

// app.get("/auth/me", (req, res) => {
//     if (!req.user) {
//         return res.status(404).send("User Not Found");
//     } else {
//         return res.status(200).send(req.user);
//     }
// });

// app.get("/auth/logout", (req, res) => {
//     req.logOut();
//     res.redirect(302, "http://localhost:3000/#/");
// });

// passport.serializeUser((user_id, done) => {
//     done(null, user_id);
// });
// passport.deserializeUser((user_id, done) => {
//     app
//         .get("db")
//         .find_current_user([user_id])
//         .then(user => {
//             done(null, user[0]);
//         });
// });

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
