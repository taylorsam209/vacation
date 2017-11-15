const axios = require("axios");

module.exports = {

    getDay: (req, res) => {
        const db = req.app.get('db');
        const dayId = req.params.id;

        db.trip.get_day(dayId)
            .then(day => res.status(200).send(day[0]))
            .catch(() => res.status(500).send('Cannot obtain the specified day.'))
    },

    addDay: (req, res) => {
        const db = req.app.get('db');
        const { trip_id, date } = req.body;

        db.trip.add_day([trip_id, date])
            .then((trips) => {
                db.trip.get_all_days(trip_id)
                    .then(days => {
                        res.status(200).send(days)
                    })
                    .catch(() => res.status(500).send('Cannot add new day.'))
            })
    },

    editDay: (req, res) => {
        const db = req.app.get('db');
        const { date, day_id } = req.body;

        db.trip.edit_day([date, day_id])
            .then(() => {
                db.trip.get_day(day_id)
                    .then(day => {
                        res.status(200).send(day)
                    })
            })
            .catch(() => res.status(500).send('Cannot edit the specified day.'))
    },

    deleteDay: (req, res) => {
        const db = req.app.get('db');
        const dayId = req.params.id;

        db.trip.delete_day(dayId)
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send('Cannot delete specified day.'))
    }
}