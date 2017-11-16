const axios = require('axios');

module.exports = {
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
  }


};

// //Endpoints for Dashboard Component
// app.get('/api/trips/users/:id', controllers.getAllTrips)
// app.get('/api/trip/:id', controllers.getTrip) *
// app.post('/api/trip', controllers.addTrip)
// app.delete('/api/trip/:id', controllers.deleteTrip)
//
// //Endpoints for trip/current trip Component
// app.get('/api/trip/days/:id', controllers.getAllDays)
// app.get('/api/trip/day/:id', tripController.getDay);
// app.post('/api/trip/day', tripController.addDay);
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
