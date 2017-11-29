require("dotenv").config();
const express = require("express"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    massive = require("massive"),
    passport = require("passport"),
    Auth0Strategy = require("passport-auth0"),
    cors = require("cors"),
    controllers = require('./controllers'),
    tripController = require('./tripController'),
    dayController = require('./dayController'),
    notiController = require('./notiController'),
    restController = require('./restController'),
    userController = require('./userController'),
    groupController = require('./groupController');

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
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    console.log('Massive is running/connected to DB.')
})

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    // console.log(profile) (If you need to see the object from the social profile ie. google, facebook, etc)
    db.auth.find_user([profile.identities[0].user_id]).then(user => {
        if (user[0]) {
            return done(null, user[0].user_id)
        } else {
            const user = profile._json;
            db.auth.create_user([user.name, user.email, user.picture, user.identities[0].user_id])
                .then(user => {
                    return done(null, user[0].user_id)
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
    if (!req.user) {
        return res.status(200).send(false)
    }
    return res.status(200).send(req.user);
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302, process.env.LOGOUT_REDIRECT)
})

passport.serializeUser(function (id, done) {
    done(null, id);
});

passport.deserializeUser(function (id, done) {
    const db = app.get('db');
    db.auth.find_current_user([id])
        .then(user => {
            done(null, user[0]);
            // console.log('This is USER[0]', user[0]);
        })
})

//Endpoints to work with Users
app.get('/api/users/:id', userController.getUser);
app.delete('/api/users/:id', userController.deleteUser);

//Endpoints for Dashboard Component
app.get('/api/trips/users/:id', controllers.getAllTrips)
app.get('/api/trip/:id', controllers.getTrip)
app.post('/api/trip', controllers.addTrip)
app.delete('/api/trip/:id', controllers.deleteTrip)

//Endpoints for trip/current trip Component
app.get('/api/trip/days/:id', controllers.getAllDays)
app.get('/api/trip/day/:id', tripController.getDay);
app.post('/api/trip/day', tripController.addDay);
app.put('/api/trip/day', tripController.editDay);
app.delete('/api/trip/day/:id', tripController.deleteDay);

//Endpoints for Day Component
app.get('/api/day/events/:id', dayController.getEvents);
app.get('/api/flight/:id', dayController.getFlight);
app.put('/api/flight', dayController.editFlight);
app.put('/api/rentalcar', dayController.editRentalCar);
app.put('/api/activity', dayController.editActivity);
app.put('/api/lodging', dayController.editLodging);
app.post('/api/lodging', dayController.addLodging);
app.post('/api/flight', dayController.addFlight);
app.post('/api/rentalcar', dayController.addRentalCar);
app.post('/api/activity', dayController.addActivity);
app.delete('/api/lodging/:id', dayController.deleteLodging);
app.delete('/api/flight/:id', dayController.deleteFlight);
app.delete('/api/rentalcar/:id', dayController.deleteRentalCar);
app.delete('/api/activity/:id', dayController.deleteActivity);

//Endpoints for Noti Component
app.get('/api/notify/:id', notiController.getNotifications);
app.post('/api/notify', notiController.addNotification);
app.delete('/api/notify/:id', notiController.deleteNotification);

//Endpoints for Restaurant Feature
app.get('/api/restaurants/:location', restController.searchRestaurants)
app.get('/api/restaurant/:id', restController.getRestaurant)
app.get('/api/restaurant/reviews/:id', restController.getReviews)
app.post('/api/restaurant', restController.addRestaurant)
app.get('/api/savedRestaurants/:id', restController.getSavedRestaurants)
app.delete('/api/restaurant/:id', restController.deleteRestaurant)

//Endpoints for Group Feature/Functions
app.get('/api/trip/group/:id', groupController.getGroup);
app.get('/api/trip/code/:id', groupController.getTripByCode);
app.post('/api/group', groupController.joinGroup);
app.delete('/api/group', groupController.deleteMember);
