const axios = require('axios');

module.exports = {
  //Dashboard Component

  /* Returns an array all trip objects owned by a user by user_id */
  getAllTrips(url, user_id) {
    return axios.get(`${url}trips/users/${user_id}`).then(res => {
      return res.data;
    });
  },

  /* Returns one trip object by trip_id */
  getTrip(url, trip_id) {
    return axios.get(`${url}trip/${trip_id}`).then(res => {
      return res.data;
    });
  },

  /* Takes a trip object with a user_id required.
     Returns an array of trip objects
     including the new trip */
  addTrip(url, obj) {
    return axios.post(`${url}trip`, obj).then(res => {
      return res.data;
    });
  },

  /* Deletes a trip object by trip_id, returns an array of trips */
  deleteTrip(url, trip_id) {
    return axios.delete(`${url}trip/${trip_id}`).then(res => {
      return res.data;
    });
  },
  //Trip Component

  /* Gets an array of day objects by trip id */
  getAllDays(url, trip_id) {
    return axios.get(`${url}trip/days/${trip_id}`).then(res => {
      return res.data;
    });
  },

  /* Gets a day object by day id */
  getDay(url, day_id) {
    return axios.get(`${url}trip/day/${day_id}`).then(res => {
      return res.data;
    });
  },

  /* Creates posts a new day object, object requires a trip_id and date */
  addDay(url, obj) {
    return axios.post(`${url}trip/day`, obj).then(res => {
      return res.data;
    });
  },

  /* Updates the date of a day object saved on the server, requires
     an object with a day_id and a date */
  editDay(url, obj) {
    return axios.put(`${url}trip/day`, obj).then(res => {
      return res.data;
    });
  },

  /* Deletes a trip by trip_id */
  deleteDay(url, trip_id) {
    return axios.delete(`${url}trip/${trip_id}`).then(res => {
      return res.data;
    });
  },

  //Day Component

  /* Returns an array of arrays by day_id.
     Each inner array is an array of
     flight, rental car, activity,
     lodging or restaurant objects */
  getEvents(url, day_id) {
    return axios.get(`${url}day/events/${day_id}`).then(res => {
      return res.data;
    });
  },

  /* Post a new flight */
  addFlight(url) {

  },

  editFlight(url) {

  },

  deleteFlight(url) {

  },

  addRentalCar(url) {

  },

  editRentalCar(url) {

  },

  deleteRentalCar(url) {

  },

  addActivity(url) {

  },

  editActivity(url) {

  },

  deleteActivity(url) {

  },

  addLodging(url) {

  },

  editLodging(url) {

  },

  deleteLodging(url) {

  },

  // Noti

  /* Returns an array of all notifications by trip_id */
  getNotifications(url, trip_id) {
    return axios.get(`${url}notify/${trip_id}`).then(res => {
      return res.data;
    });
  },

  /* Posts a new notificaton object. Returns a string:
      'Notification successfully created.'
     Object requires trip_id, user_id and notification_text */
  addNotification(url, obj) {
    return axios.post(`${url}notify`, obj).then(res => {
      return res.data;
    });
  },

  /* Deletes a notificaton by notification_id.
     Returns a string: 'Notification successfully deleted.' */
  deleteNotification(url, notification_id) {
    return axios.delete(`${url}notify/${notification_id}`).then(res => {
      return res.data;
    });
  }
};

// //Endpoints for Dashboard Component
// app.get('/api/trips/users/:id', controllers.getAllTrips) **
// app.get('/api/trip/:id', controllers.getTrip) **
// app.post('/api/trip', controllers.addTrip) **
// app.delete('/api/trip/:id', controllers.deleteTrip) **
//
// //Endpoints for trip/current trip Component
// app.get('/api/trip/days/:id', controllers.getAllDays) **
// app.get('/api/trip/day/:id', tripController.getDay); **
// app.post('/api/trip/day', tripController.addDay); **
// app.put('/api/trip/day', tripController.editDay); **
// app.delete('/api/trip/day/:id', tripController.deleteDay); *
//
// //Endpoints for Day Component
// // app.get('/api/day/events/:id', dayController.getEvents);
// // app.put('api/flight/:id', dayController.editFlight);
// // app.put('api/rentalcar/:id', dayController.editRentalCar);
// // app.put('api/activity/:id', dayController.editActivity);
// // app.put('/api/lodging/:id', dayController.editLodging);
// // app.post('/api/lodging', dayController.addLodging);
// // app.post('api/flight', dayController.addFlight);
// // app.post('api/rentalcar', dayController.addRentalCar);
// // app.post('api/activity', dayController.addActivity);
// // app.delete('/api/lodging/:id', dayController.deleteLodging);
// // app.delete('api/flight/:id', dayController.deleteFlight);
// // app.delete('api/rentalcar/:id', dayController.deleteRentalCar);
// // app.delete('api/activity/:id', dayController.deleteActivity);
//
// //Endpoints for Noti Component
// app.get('/api/notify/:id', notiController.getNotifications); **
// app.post('/api/notify', notiController.addNotification); *
// app.delete('/api/notify/:id', notiController.deleteNotification); *
