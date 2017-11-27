const axios = require('axios');

module.exports = {

    getEvents: (req, res) => {
        const db = req.app.get('db');
        const dayId = req.params.id;
        const arr = [];
        var count = 0;

        db.day.get_all_rentals(dayId)
            .then(rentals => {
                arr.push(rentals)
                db.day.get_all_lodging(dayId)
                    .then(lodging => {
                        arr.push(lodging);
                        db.day.get_all_flights(dayId)
                            .then(flights => {
                                arr.push(flights);
                                db.day.get_all_activities(dayId)
                                    .then(activities => {
                                        arr.push(activities)
                                        res.status(200).send(arr);
                                    })
                            })
                    })
            })
    },

    getFlight: (req, res) => {
        const db = req.app.get('db');
        const flightId = req.params.id;

        db.day.get_flight(flightId)
            .then(flight => res.status(200).send(flight))
            .catch(() => res.status(500).send());
    },

    editFlight: (req, res) => {
        const db = req.app.get('db');
        const { confirmation, airline_name, flight_id } = req.body;

        db.day.edit_flight([confirmation, airline_name, flight_id])
            .then(() => {
                db.day.get_flight(flight_id)
                    .then(flight => {
                        res.status(200).send(flight[0])
                    })
            })
            .catch(() => res.status(500).send('Cannot edit the specified flight.'))
    },

    editRentalCar: (req, res) => {
        const db = req.app.get('db');
        const { rental_company, rental_details, rental_id } = req.body;

        db.day.edit_rental_car([rental_company, rental_details, rental_id])
            .then(() => {
                db.day.get_rental_car(rental_id)
                    .then(rental => {
                        res.status(200).send(rental[0])
                    })
            })
            .catch(() => res.status(500).send('Cannot edit the specified rental car.'))
    },

    editActivity: (req, res) => {
        const db = req.app.get('db');
        const { activity_name, activity_details, activity_id } = req.body;

        db.day.edit_activity([activity_name, activity_details, activity_id])
            .then(() => {
                db.day.get_activity(activity_id)
                    .then(activity => {
                        res.status(200).send(activity[0])
                    })
            })
            .catch(() => res.status(500).send('Cannot edit the specified activity.'))
    },

    editLodging: (req, res) => {
        const db = req.app.get('db');
        const { lodging_name, lodging_details, lodging_id } = req.body;

        db.day.edit_lodging([lodging_name, lodging_details, lodging_id])
            .then(() => {
                db.day.get_lodging(lodging_id)
                    .then(lodging => {
                        res.status(200).send(lodging[0])
                    })
            })
            .catch(() => res.status(500).send('Cannot edit the specified lodging.'))
    },

    addLodging: (req, res) => {
        const db = req.app.get('db');
        const { lodging_name, lodging_details, day_id } = req.body;

        db.day.add_lodging([lodging_name, lodging_details, day_id])
            .then(() => {
                db.day.get_all_lodging(day_id)
                    .then(lodgings => {
                        res.status(200).send(lodgings)
                    })
            })
            .catch(() => res.status(500).send('Cannot add this lodging.'))
    },

    addFlight: (req, res) => {
        const db = req.app.get('db');
        const { confirmation, airline_name, day_id } = req.body;

        db.day.add_flight([confirmation, airline_name, day_id])
            .then(() => {
                db.day.get_all_flights(day_id)
                    .then(flights => {
                        res.status(200).send(flights)
                    })
            })
            .catch(() => res.status(500).send('Cannot add this flight.'))
    },

    addRentalCar: (req, res) => {
        const db = req.app.get('db');
        const { rental_company, rental_details, day_id } = req.body;

        db.day.add_rental_car([rental_company, rental_details, day_id])
            .then(() => {
                db.day.get_all_rentals(day_id)
                    .then(rentals => {
                        res.status(200).send(rentals)
                    })
            })
            .catch(() => res.status(500).send('Cannot add this rental car.'))
    },

    addActivity: (req, res) => {
        const db = req.app.get('db');
        const { activity_name, activity_details, day_id } = req.body;

        db.day.add_activity([activity_name, activity_details, day_id])
            .then(() => {
                db.day.get_all_activities(day_id)
                    .then(activities => {
                        res.status(200).send(activities)
                    })
            })
            .catch(() => res.status(500).send('Cannot add this activity.'))
    }

    // deleteLodging: (req, res) => {
    //     const db = req.app.get('db')
    //     const lodgingId = req.params.id;

    //     db.day.get_lodging(lodgingId)
    //     .then(lodging => {
    //         db.day.delete_lodging(lodgingId)
    //         .then(() => {
    //             res.status(200).send(lodging)
    //         })
    //     })
    //     .catch(() => res.status(500).send('Cannot delete user.'))
    // }
}