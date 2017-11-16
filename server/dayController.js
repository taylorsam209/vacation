const axios = require('axios');

module.exports = {

    getEvents: (req, res) => {
        const db = req.app.get('db');
        const dayId = req.params.id;
        const arr = [];


        db.day.get_all_rentals(dayId)
            .then(rentals => {
                arr.push(rentals)
                db.day.get_all_restaurants(dayId)
                    .then(restaurants => {
                        arr.push(restaurants);
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
            })
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
    }
}