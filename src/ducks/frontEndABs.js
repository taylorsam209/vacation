const axios = require('axios');

module.exports = {
//Dashboard Component

  /* Returns an array all trip objects owned by a user by user_id */
  getAllTrips(url, user_id) {
    return axios.get(`${url}trips/users/${user_id}`).then(res=>{
      return res.data;
    });
  },

  /* Returns one trip object by trip_id */
  getTrip(url, trip_id) {
    return axios.get(`${url}trip/${trip_id}`).then(res=>{
      return res.data;
    });
  },

  /* Takes a trip object with a user_id required.
     Returns an array of trip objects
     including the new trip */
  addTrip(url, obj) {
    return axios.post(`${url}trip`, obj).then(res=>{
      return res.data;
    });
  },

  /* Deletes a trip object by trip_id, returns an array of trips */
  deleteTrip(url, trip_id) {
    return axios.delete(`${url}trip/${trip_id}`).then(res=>{
      return res.data;
    });
  },
//Trip Component

  /* Gets an array of day objects by trip id */
  getAllDays(url, trip_id) {
    return axios.get(`${url}trip/days/${trip_id}`).then(res=>{
      return res.data;
    });
  },

  /* Gets a day object by day id */
  getDay(url, day_id) {
    return axios.get(`${url}trip/day/${day_id}`).then(res=>{
      return res.data;
    });
  },

  /* Creates posts a new day object, object requires a trip_id and date */
  addDay(url, obj) {
    return axios.post(`${url}trip/day`).then(res=>{
      return res.data;
    });
  }


};

// //Endpoints for Dashboard Component
// app.get('/api/trips/users/:id', controllers.getAllTrips) **
// app.get('/api/trip/:id', controllers.getTrip) **
// app.post('/api/trip', controllers.addTrip) **
// app.delete('/api/trip/:id', controllers.deleteTrip) *
//
// //Endpoints for trip/current trip Component
// app.get('/api/trip/days/:id', controllers.getAllDays) *
// app.get('/api/trip/day/:id', tripController.getDay); *
// app.post('/api/trip/day', tripController.addDay); *
// app.put('/api/trip/day', tripController.editDay);
// app.delete('/api/trip/day/:id', tripController.deleteDay);
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
// app.get('/api/notify/:id', notiController.getNotifications);
// app.post('/api/notify', notiController.addNotification);
// app.delete('/api/notify/:id', notiController.deleteNotification);