module.exports = {
    getGroup: (req, res) => {
        const db = req.app.get('db');
        const tripId = req.params.id;

        db.group.get_group(tripId)
            .then(group => {
                res.status(200).send(group)
            })
            .catch(() => res.status(500).send("Cannot locate group"))
    },

    getTripByCode: (req, res) => {
        const db = req.app.get('db');
        const tripCode = req.params.id;

        db.group.get_trip_by_code(tripCode)
            .then(trip => {
                res.status(200).send(trip)
            })
            .catch(() => res.status(500).send("Could not locate trip."))
    },

    joinGroup: (req, res) => {
        const db = req.app.get("db");
        const { user_id, trip_id } = req.body;

        db.group.join_group([user_id, trip_id])
            .then(() => {
                res.status(200).send("Successfully added to trip!")
            })
            .catch(() => res.status(500).send("Unable to add user to trip."))
    },

    deleteMember: (req, res) => {
        const db = req.app.get('db');
        const { user_id, trip_id } = req.body;

        db.group.delete_member([user_id, trip_id])
            .then(() => {
                res.status(200).send("Member has been removed.")
            })
            .catch(() => res.status(500).send("Unable to remove member."))
    }

}
