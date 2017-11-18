import axios from "axios";

const url = '/api/';
const ab = require('./frontEndABs');
const { getTrip } = ab;

const G_ICON_CHANGE = 'G_ICON_CHANGE'
  , NOTI_TOGGLE = 'NOTI_TOGGLE'
  , GROUP_TOGGLE = 'GROUP_TOGGLE'
  , NEW_TRIP = 'NEW_TRIP'
  , UPDATE_CURRENT_TRIP = 'UPDATE_CURRENT_TRIP'
  , _FULFILLED = '_FULFILLED'
  , SEARCH_TRIP = 'SEARCH_TRIP'
  , TRIP_CODE_SEARCH = 'TRIP_CODE_SEARCH'
  , initialState = {
    groupOpen: false,
    notiOpen: false,
    gIcon: true,
    newTripOpen: false,
    currentTrip: null,
    searchTripOpen: false,
    currentTripForCode: ''
  };

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

export function searchTripModal(value) {
  console.log("Hit Redux NEW_TRIP")
  return {
    type: SEARCH_TRIP,
    payload: value
  }
}

export function updateCurrentTrip(id) {
  return getTrip(url, id).then(res => {
    return {
      type: UPDATE_CURRENT_TRIP,
      payload: res
    };
  });
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
    default:
      return state;
  }
};
