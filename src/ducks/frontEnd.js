import axios from "axios";

const url = '/api/';
const ab = require('./frontEndABs');
const { getAllTrips
      , getTrip
      , addTrip
} = ab;

const G_ICON_CHANGE = 'G_ICON_CHANGE'
    , NOTI_TOGGLE = 'NOTI_TOGGLE'
    , GROUP_TOGGLE = 'GROUP_TOGGLE'
    , NEW_TRIP = 'NEW_TRIP'
    , UPDATE_CURRENT_TRIP = 'UPDATE_CURRENT_TRIP'
    , CREATE_NEW_TRIP = 'CREATE_NEW_TRIP'
    , UPDATE_TRIP_LIST = 'UPDATE_TRIP_LIST'
    , GET_USER_ID = "GET_USER_ID"
    , _FULFILLED = '_FULFILLED'
    , initialState = {
        user_id: 4, // Temporary default user_id is Scott Serage's
        groupOpen: false,
        notiOpen: false,
        gIcon: true,
        newTripOpen: false,
        currentTrip: null,
        tripList: []
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
  let request = getTrip(url, trip_id).then(res=>{
    return res;
  });
  return {
    type: UPDATE_CURRENT_TRIP,
    payload: request
  };
}

export function createNewTrip(tripObj){
  let request = addTrip(url, tripObj).then(res=>{
    return res;
  });
  return {
    type: CREATE_NEW_TRIP,
    payload: request
  };
}

export function updateTripList(user_id){
  let request = getAllTrips(url, user_id).then(res=>{
    return res;
  });
  return {
    type: UPDATE_TRIP_LIST,
    payload: request
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
    case UPDATE_CURRENT_TRIP + _FULFILLED:
      return Object.assign({}, state, {currentTrip: action.payload});
    case UPDATE_TRIP_LIST + _FULFILLED:
      return Object.assign({}, state, {tripList: action.payload});
    case CREATE_NEW_TRIP + _FULFILLED:
      return Object.assign({}, state, {})
    default:
      return state;
  }
};
