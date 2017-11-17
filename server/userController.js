const axios = require('axios');

module.exports = {

    getUser: (req, res) => {
        const db = req.app.get('db')
        const userId = req.params.id;

        db.user.get_user(userId)
        .then(user => {
            res.status(200).send(user)
        })
        .catch(() => res.status(500).send('Cannot locate user.'))
    },

    deleteUser: (req, res) => {
        const db = req.app.get('db')
        const userId = req.params.id;

        db.user.get_user(userId)
        .then(user => {
            db.user.delete_user(userId)
            .then(() => {
                res.status(200).send(user)
            })
        })
        .catch(() => res.status(500).send('Cannot delete user.'))
    }
}