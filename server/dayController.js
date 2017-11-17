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
        const { confirmation, airline_name, day_id } = req.body;

        db.day.edit_flight([confirmation, airline_name, day_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    editRentalCar: (req, res) => {
        const db = req.app.get('db');
        const { rental_company, rental_details, day_id } = req.body;

        db.day.edit_rental_car([rental_company, rental_details, day_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    editActivity: (req, res) => {
        const db = req.app.get('db');
        const { activity_name, activity_details, day_id } = req.body;

        db.day.edit_activity([activity_name, activity_details, day_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    editLodging: (req, res) => {
        const db = req.app.get('db');
        const { lodging_name, lodging_details, day_id } = req.body;

        db.day.edit_lodging([lodging_name, lodging_details, day_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    addLodging: (req, res) => {
        const db = req.app.get('db');
        const {lodging_name, lodging_details} = req.body;

        db.day.add_lodging([lodging_name, lodging_details])
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send())
    },

    addFlight: (req, res) => {
        const db = req.app.get('db');
        const {confirmation, airline_name} = req.body;

        db.day.add_flight([confirmation, airline_name])
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
    },

    addRentalCar: (req, res) => {
        const db = req.app.get('db');
        const {rental_company, rental_details} = req.body;

        db.day.add_rental_car([rental_company, rental_details])
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
    },

    addActivity: (req, res) => {
        const db = req.app.get('db');
        const {activity_name, activity_details} = req.body;

        db.day.add_activity([activity_name, activity_details])
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
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