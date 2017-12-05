const axios = require("axios");

module.exports = {

    getAllTrips: (req, res) => {
        const db = req.app.get("db")
        const userId = req.params.id;

        db.dashboard.get_all_trips(userId)
            .then(trips => {
                var tempTrips = trips;
                db.dashboard.get_trip_by_group(userId).then(allTrips => {
                    for (var i = 0; i < allTrips.length; i++) {
                        tempTrips.push(allTrips[i])
                    }
                    res.status(200).send(tempTrips)
                })
            })
            .catch(() => res.status(500).send("Cannot locate trips"))
    },

    getTrip: (req, res) => {
        console.log("Wrong")
        const db = req.app.get("db")
        const tripId = req.params.id;

        db.dashboard.get_trip(tripId)
            .then(trip => {
                res.status(200).send(trip[0])
            })
            .catch(() => res.status(500).send("Cannot locate specified trip"))
    },
    getTripByCode: (req, res) => {
        console.log("Hit Controller GTBC")
        const db = req.app.get("db")
        const trip_code = req.params.id;
        const user = req.params.userid;
        console.log(" User: ", user)

        db.dashboard.get_trip_by_code(trip_code)
            .then(trip => {
                var tempTrip = trip[0].trip_id
                console.log("Return dashboard GTBC", tempTrip, user)
                db.group.join_group([user, tempTrip]).then(resp => {
                    console.log("I hope it Added a trip")
                })
                res.status(200).send(trip[0])
            })
            .catch(() => res.status(500).send("Cannot locate specified trip"))
    },
    addTrip: (req, res) => {
        const db = req.app.get("db")
        const { user_id, date, trip_name, trip_code, trip_location, trip_details } = req.body;
        const message = `Here is the trip code for your trip to ${trip_name}: ${trip_code}`

        db.dashboard.add_trip([user_id, date, trip_name, trip_code, trip_location, trip_details])
            .then((trips) => {
                db.dashboard.get_all_trips(user_id)
                    .then(trips => {
                        var tempTrips = trips;
                        db.dashboard.get_trip_by_group(user_id).then(allTrips => {
                            for (var i = 0; i < allTrips.length; i++) {
                                tempTrips.push(allTrips[i])
                            }
                            db.dashboard.new_trip_noti(message, user_id)
                            res.status(200).send(tempTrips)
                        })
                    })
            })
            .catch(() => res.status(500).send("Cannot add new trip"))
    },

    deleteTrip: (req, res) => {
        const db = req.app.get("db")
        const tripId = req.params.id;

        db.dashboard.get_trip(tripId)
            .then(trip => {
                let userId = trip[0].user_id;
                console.log(userId);
                db.dashboard.delete_trip(tripId)
                    .then(() => {
                        db.dashboard.get_all_trips(userId)
                            .then((trips) => {
                                res.status(200).send(trips)
                            })
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
            .catch(() => res.status(500).send("Could not get all days."))
    }

}