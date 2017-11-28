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
  // , addFlight
  // , editFlight
  // , deleteFlight
  // , addRentalCar
  // , editRentalCar
  // , deleteRentalCar
  // , addActivity
  // , editActivity
  // , deleteActivity
  // , addLodging
  // , editLodging
  // , deleteLodging

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
    currentTripForCode: ''
  };

export function getCurrentUserID() {
  let user = axios.get('/auth/me').then(response => {
    return response.data
  })
  return {
    type: GET_USER_ID,
    payload: user.user_id
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
export function deleteSelectedTrip(trip_id){
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
// Requests all days by trip_id and updates the daylist with the returned array
export function updateDaysList(trip_id){
  let request = getAllDays(url, trip_id).then(res=>{
    return res;
  });
  return {
    type: UPDATE_DAYS_LIST,
    payload: request
  };
}

// Updates the currentDay by day_id
export function updateCurrentDay(day_id){
  let request = getDay(url, day_id).then(res=>{
    return res;
  });
  return {
    type: UPDATE_CURRENT_DAY,
    payload: request
  };
}



// Updates the eventsList by day_id
export function updateEventsList(day_id) {
  let request = getEvents(url, day_id).then(res=>{
    return res;
  });
  return {
    type: UPDATE_EVENTS_LIST,
    payload: request
  };
}

// Unique function, stores the passed in flight, activity, lodging, or rentalcar obj
export function updateCurrentEvent(eventObj){
  return {
    type: UPDATE_CURRENT_EVENT,
    payload: eventObj
  };
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
      return Object.assign({}, state, {tripList: action.payload });
    case UPDATE_DAYS_LIST + _FULFILLED:
      return Object.assign({}, state, {daysList: action.payload});
    case UPDATE_CURRENT_DAY + _FULFILLED:
      return Object.assign({}, state, {currentDay: action.payload});
    case UPDATE_EVENTS_LIST + _FULFILLED:
      return Object.assign({}, state, {eventsList: action.payload});
    case UPDATE_CURRENT_EVENT:
      return Object.assign({}, state, {currentEvent: action.payload});
    case CREATE_NEW_TRIP + _FULFILLED:
      let {updatedTripList, updatedCurrentTrip} = action.payload
      return Object.assign({}, state, {tripList: updatedTripList, currentTrip: updatedCurrentTrip});
    default:
      return state;
  }
};
