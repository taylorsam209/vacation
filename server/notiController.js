
module.exports = {

    getNotifications: (req, res) => {
        const db = req.app.get('db');
        const userId = req.params.id;

        db.noti.get_notifications(userId)
        .then(notifications => {
            res.status(200).send(notifications)
        })
        .catch(()=> res.status(500).send("Notifications not found"))
    },

    addNotification: (req, res) => {
        const db = req.app.get('db');
        const {trip_id, user_id, notification_text} = req.body;

        db.noti.add_notification([trip_id, user_id, notification_text])
        .then(() => {
            res.status(200).send("Notification successfully created.")
        })
        .catch(()=> res.status(500).send("Unable to create notification"))
    },

    deleteNotification: (req, res) => {
        const db = req.app.get('db');
        const notiId = req.params.id;

        db.noti.delete_notification(notiId)
        .then(() => {
            res.status(200).send("Notification successfully deleted.")
        })
        .catch(()=> res.status(500).send("Unable to delete notification."))
    }
}