import axios from "axios";

const url = '/api/';
const ab = require('./frontEndABs');
const { getAllTrips // Dashboard
  // Dashboard
  , getTrip
  , addTrip
  , deleteTrip

  // Trip Component
  , getAllDays
  , getDay
  , addDay
  , editDay
  , deleteDay

  // Day Component

  , getEvents
  , addFlight
  , editFlight
  , deleteFlight
  , addRentalCar
  , editRentalCar
  , deleteRentalCar
  , addActivity
  , editActivity
  , deleteActivity
  , addLodging
  , editLodging
  , deleteLodging

  // NOTI

  , getNotifications
  , addNotification
  , deleteNotification

} = ab;

const G_ICON_CHANGE = 'G_ICON_CHANGE'
  , NOTI_TOGGLE = 'NOTI_TOGGLE'
  , GROUP_TOGGLE = 'GROUP_TOGGLE'
  , NEW_TRIP = 'NEW_TRIP'
  , UPDATE_CURRENT_TRIP = 'UPDATE_CURRENT_TRIP'
  , CREATE_NEW_TRIP = 'CREATE_NEW_TRIP'
  , CREATE_NEW_DAY = 'CREATE_NEW_DAY'
  , EDIT_SELECTED_DAY = 'EDIT_SELECTED_DAY'
  , DELETE_SELECTED_DAY = 'DELETE_SELECTED_DAY'
  , UPDATE_TRIP_LIST = 'UPDATE_TRIP_LIST'
  , DELETE_SELECTED_TRIP = 'DELETE_SELECTED_TRIP'
  , UPDATE_DAYS_LIST = 'UPDATE_DAYS_LIST'
  , UPDATE_CURRENT_DAY = 'UPDATE_CURRENT_DAY'
  , UPDATE_EVENTS_LIST = 'UPDATE_EVENTS_LIST'
  , UPDATE_CURRENT_EVENT = 'UPDATE_CURRENT_EVENT'
  , GET_USER_ID = "GET_USER_ID"
  , _FULFILLED = '_FULFILLED'
  , SEARCH_TRIP = 'SEARCH_TRIP'
  , TRIP_CODE_SEARCH = 'TRIP_CODE_SEARCH'
  , CLOSE_RESTAURANT_MODAL = 'CLOSE_RESTAURANT_MODAL'
  , OPEN_RESTAURANT_MODAL = 'OPEN_RESTAURANT_MODAL'
  , UPDATE_NOTIFICATIONS_LIST = 'UPDATE_NOTIFICATIONS_LIST'
  , CREATE_NEW_NOTIFICATION = 'CREATE_NEW_NOTIFICATION'
  , DELETE_SELECTED_NOTIFICATION = 'DELETE_SELECTED_NOTIFICATION'
  , initialState = {
    user_id: 4, // Temporary default user_id is Scott Serage's
    groupOpen: false,
    notiOpen: false,
    gIcon: true,
    newTripOpen: false,
    currentTrip: null,
    tripList: [],
    daysList: [],
    currentDay: null,
    eventsList: [],
    currentEvent: null,
    searchTripOpen: false,
    currentTripForCode: '',
    notificationsList: [],
    restaurantModalToggle: false

  };

export function getCurrentUserID() {
  let userId = axios.get('/auth/me').then(response => {
    return response.data.user_id
  })
  return {
    type: GET_USER_ID,
    payload: userId
  }
}

export function showGroup(value) {
  console.log("Hit Redux showGroup")
  return {
    type: G_ICON_CHANGE,
    payload: value
  }
}

export function showNoti(value) {
  console.log("Hit Redux showNoti")
  return {
    type: NOTI_TOGGLE,
    payload: value
  }
}

export function groupShow(value) {
  console.log("Hit Redux groupShow")
  return {
    type: GROUP_TOGGLE,
    payload: value
  }
}

export function newTripModal(value) {
  console.log("Hit Redux NEW_TRIP")
  return {
    type: NEW_TRIP,
    payload: value
  }
}

// Changes the 'current trip' to the trip of the trip_id passed in.
export function updateCurrentTrip(trip_id) {
  let request = getTrip(url, trip_id).then(res => {
    return res;
  });
  return {
    type: UPDATE_CURRENT_TRIP,
    payload: request
  };
}

// Makes a new trip on the backend, returns array of trip objects
export function createNewTrip(tripObj) {
  let request = addTrip(url, tripObj).then(res => {
    return res;
  });
  return {
    type: CREATE_NEW_TRIP,
    payload: {
      updatedTripList: request,
      updatedCurrentTrip: request.slice(-1)[0]// newest trip, aka the last item in the returned array
    }
  };
}

// Deletes a trip by trip_id and returns an array of trips by the deleted trip's user_id
export function deleteSelectedTrip(trip_id) {
  let request = deleteTrip(url, trip_id).then(res => {
    return res;
  });
  return {
    type: DELETE_SELECTED_TRIP,
    payload: request
  };
}

// Requests the user's trips by user_id and updates the tripList accordingly
export function updateTripList(user_id) {
  let request = getAllTrips(url, user_id).then(res => {
    return res;
  });
  return {
    type: UPDATE_TRIP_LIST,
    payload: request
  };
}
// Requests all days by trip_id and updates the dayList with the returned array
export function updateDaysList(trip_id) {
  console.log("Attempt at Day List")
  let request = getAllDays(url, trip_id).then(res => {
    console.log("Response", res)
    return res;
  });
  return {
    type: UPDATE_DAYS_LIST,
    payload: request
  };
}

// Updates the currentDay by day_id
export function updateCurrentDay(day_id) {
  let request = getDay(url, day_id).then(res => {
    return res;
  });
  return {
    type: UPDATE_CURRENT_DAY,
    payload: request
  };
}

// Takes a 'day' object and returns the updated daysList
export function createNewDay(new_day) {
  let request = addDay(url, new_day).then(res => {
    return res;
  });
  return {
    type: CREATE_NEW_DAY,
    payload: request
  }
}

// Takes a 'day' object (day_id and date required) and returns the edited day
export function editSelectedDay(day_obj) {
  let request = editDay(url, day_obj).then(res => {
    return res;
  });
  return {
    type: EDIT_SELECTED_DAY,
    payload: request
  };
}

// Takes a day_id and returns an updateDaysList with the day with the given day_id deleted
export function deletedSelectedDay(day_id) {
  let request = deleteDay(url, day_id).then(res => {
    return res;
  });
  return {
    type: DELETE_SELECTED_DAY,
    payload: request
  };
}

// Updates the eventsList by day_id
export function updateEventsList(day_id) {
  let request = getEvents(url, day_id).then(res => {
    return res;
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  };
}

// Unique function, stores the passed in flight, activity, lodging, or rentalcar obj
export function updateCurrentEvent(eventObj) {
  return {
    type: UPDATE_CURRENT_EVENT,
    payload: eventObj
  };
}

export function createNewFlight(flightObj) {
  let request = addFlight(url, flightObj).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function editSelectedFlight(flightObj) {
  let request = editFlight(url, flightObj).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function deleteSelectedFlight(flightId) {
  let request = deleteFlight(url, flightId).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function createNewRental(rentalObj) {
  let request = addRentalCar(url, rentalObj).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function editSelectedRental(rentalObj) {
  let request = editRentalCar(url, rentalObj).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function deleteSelectedRental(rentalId) {
  let request = deleteRentalCar(url, rentalId).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function createNewActivity(activityObj) {
  let request = addActivity(url, activityObj).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function editSelectedActivity(activityObj) {
  let request = editActivity(url, activityObj).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function deleteSelectedActivity(activityId) {
  let request = deleteActivity(url, activityId).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function createNewLodging(lodgingObj) {
  let request = addLodging(url, lodgingObj).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function editSelectedLodging(lodgingObj) {
  let request = editLodging(url, lodgingObj).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function deleteSelectedLodging(lodgingId) {
  let request = deleteLodging(url, lodgingId).then(res => {
    return res
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  }
}

export function searchTripModal(value) {
  console.log("Hit Redux NEW_TRIP")
  return {
    type: SEARCH_TRIP,
    payload: value
  }
}

export function getTripByCode(code) {
  // return getTripByCode(url, code).then(res => {
  return {
    type: TRIP_CODE_SEARCH,
    payload: code
  };
  // });
}

// Updates the notificationsList by trip_id
export function updateNotificationsList(trip_id) {
  let request = getNotifications(url, trip_id).then(res => {
    return res;
  });
  return {
    type: UPDATE_NOTIFICATIONS_LIST,
    payload: request
  };
};


// Takes a 'trip' object (trip_id, user_id, and notification_text required)
// returns a message
export function createNewNotification(tripObj) {
  let request = addNotification(url, tripObj).then(res => {
    return res;
  });
  return {
    type: CREATE_NEW_NOTIFICATION,
    payload: request
  }
}

// Not sure if this works either
// Takes a Notification id and returns a message
export function deleteSelectedNotification(notification_id) {
  let request = deleteNotification(url, notification_id).then(res => {
    return res;
  });
  return {
    type: DELETE_SELECTED_NOTIFICATION,
    payload: request
  }
}


// Sets the restaurant modal to false
export function closeRestaurantModal() {
  return {
    type: CLOSE_RESTAURANT_MODAL,
    payload: false
  };
}

// Sets the restaurant modal to true
export function openRestaurantModal() {
  return {
    type: OPEN_RESTAURANT_MODAL,
    payload: true
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ID + _FULFILLED:
      return Object.assign({}, state, { user_id: action.payload });
    case G_ICON_CHANGE:
      return Object.assign({}, state, { gIcon: action.payload });
    case GROUP_TOGGLE:
      return Object.assign({}, state, { groupOpen: action.payload });
    case NOTI_TOGGLE:
      return Object.assign({}, state, { notiOpen: action.payload });
    case NEW_TRIP:
      return Object.assign({}, state, { newTripOpen: action.payload });
    case SEARCH_TRIP:
      return Object.assign({}, state, { searchTripOpen: action.payload });
    case TRIP_CODE_SEARCH:
      return Object.assign({}, state, { currentTripForCode: action.payload });
    case UPDATE_CURRENT_TRIP + _FULFILLED:
      return Object.assign({}, state, { currentTrip: action.payload });
    case UPDATE_TRIP_LIST + _FULFILLED:
      return Object.assign({}, state, { tripList: action.payload });
    case DELETE_SELECTED_TRIP + _FULFILLED:
      return Object.assign({}, state, { tripList: action.payload });
    case UPDATE_DAYS_LIST + _FULFILLED:
      return Object.assign({}, state, { daysList: action.payload });
    case UPDATE_CURRENT_DAY + _FULFILLED:
      return Object.assign({}, state, { currentDay: action.payload });
    case UPDATE_EVENTS_LIST + _FULFILLED:
      return Object.assign({}, state, { eventsList: action.payload });
    case UPDATE_CURRENT_EVENT:
      return Object.assign({}, state, { currentEvent: action.payload });
    case CREATE_NEW_TRIP + _FULFILLED:
      let { updatedTripList, updatedCurrentTrip } = action.payload
      return Object.assign({}, state, { tripList: updatedTripList, currentTrip: updatedCurrentTrip });
    case CREATE_NEW_DAY + _FULFILLED:
      return Object.assign({}, state, { daysList: action.payload });
    case EDIT_SELECTED_DAY + _FULFILLED:
      return Object.assign({}, state, { currentDay: action.payload });
    case DELETE_SELECTED_DAY + _FULFILLED:
      return Object.assign({}, state, { daysList: action.payload });
    case CLOSE_RESTAURANT_MODAL:
      return Object.assign({}, state, { restaurantModalToggle: action.payload });
    case OPEN_RESTAURANT_MODAL:
      return Object.assign({}, state, { restaurantModalToggle: action.payload });
    case UPDATE_NOTIFICATIONS_LIST:
      return Object.assign({}, state, { notificationsList: action.payload });
    case CREATE_NEW_NOTIFICATION:
      return state; // action.payload is a message, need to create a way to display it
    case DELETE_SELECTED_NOTIFICATION:
      return state; // action.payload is a message, need to create a way to display it
    default:
      return state;
  }
};
