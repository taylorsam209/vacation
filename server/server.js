require("dotenv").config();
const express = require("express"),
session = require("express-session"),
bodyParser = require("body-parser"),
massive = require("massive"),
passport = require("passport"),
Auth0Strategy = require("passport-auth0"),
cors = require("cors");
controllers = require('./controllers');

const PORT = 3010;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
})

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    db.find_user([profile.identities[0].user_id]).then(user => {
        if (user[0]) {
            return done(null, user[0].id)
        } else {
            const user = profile._json;
            db.create_user([user.name, user.email, user.picture, user.identities[0].user_id])
                .then(user => {
                    return done(null, user[0].id)
                })
        }
    })
}));

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}));

app.get('/auth/me', (req, res) => {
    if(!req.user) {
        return res.status(200).send(false)
    }
    return res.status(200).send(req.user);
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302,process.env.SUCCESS_REDIRECT)
})

passport.serializeUser(function (id, done) {
    done(null, id);
});

passport.deserializeUser(function (id, done) {
    app.get('db').find_current_user([id])
        .then(user => {
            done(null, user[0]);
        })
})

//Endpoints for Dashboard Component
app.get('/api/trips/users/:id', controllers.getAllTrips)
app.get('/api/trip/:id',controllers.getTrip)
app.post('/api/trip', controllers.addTrip)
app.delete('/api/trip/:id', controllers.deleteTrip)

//Endpoints for trip/current trip Component
app.get('/api/trip/days/:id', controllers.getAllDays)







app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
