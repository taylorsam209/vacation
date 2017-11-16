const axios = require('axios');

module.exports = {

    getEvents: (req, res) => {
        const db = req.app.get('db');
        const dayId = req.params.id;

        db.day.get_events(dayId)
            .then(events => {
                res.status(200).send(events)
            })
            .catch(() => res.status(500).send('Cannot obtain days events.'))
    },

    editFlight: (req, res) => {
        const db = req.app.get('db');
        const flightId = req.params.id;

        db.day.edit_flight(flightId)
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    editRentalCar: (req, res) => {
        const db = req.app.get('db');
        const rentalId = req.params.id;

        db.day.edit_rental_car(rentalId)
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    editActivity: (req, res) => {
        const db = req.app.get('db');
        const activityId = req.params.id;

        db.day.edit_activity(activityId)
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    editLodging: (req, res) => {
        const db = req.app.get('db');
        const lodgingId = req.params.id;

        db.day.edit_lodging(lodgingId)
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    }
}