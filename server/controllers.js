const axios = require("axios");

module.exports = {

    getAllTrips: (req, res) => {
        const db = req.app.get("db")
        const userId = req.params.id;

        db.dashboard.get_all_trips(userId)
            .then(trips => {
                res.status(200).send(trips)
            })
            .catch(() => res.status(500).send("Cannot locate trips"))
    },

    getTrip: (req, res) => {
        const db = req.app.get("db")
        const tripId = req.params.id;

        db.dashboard.get_trip(tripId)
            .then(trip => {
                res.status(200).send(trip[0])
            })
            .catch(() => res.status(500).send("Cannot locate specified trip"))
    },
    addTrip: (req, res) => {
        const db = req.app.get("db")
        const { user_id, date, trip_name, trip_code, trip_location, trip_details } = req.body;

        db.dashboard.add_trip([user_id, date, trip_name, trip_code, trip_location, trip_details])
            .then((trips) => {
               db.dashboard.get_all_trips(user_id)
               .then(trips => {
                   res.status(200).send(trips)
               })
            })
            .catch(() => res.status(500).send("Cannot add new trip"))
    },

    deleteTrip: (req, res) => {
        const db = req.app.get("db")
        const tripId = req.params.id;
        // const deletedTrip = null;

        db.dashboard.get_trip(tripId)
        .then(trip => {
            // deletedTrip = trip
            db.dashboard.delete_trip(tripId)
            .then(() => {
                res.status(200).send(trip)
            })
        })
        .catch(() => res.status(500).send("Cannot delete trip"))
    },

    getAllDays: (req, res) => {
        const db = req.app.get('db');
        const tripId = req.params.id;

        db.trip.get_all_days(tripId)
        .then(days => {
            res.status(200).send(days)
        })
        .catch(()=> res.status(500).send("Could not get all days."))
    }

}