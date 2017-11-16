import axios from "axios";

const initialState = {
  groupOpen: false,
  notiOpen: false,
  gIcon: true,
  newTripOpen: false
}
  , G_ICON_CHANGE = 'G_ICON_CHANGE',
  NOTI_TOGGLE = 'NOTI_TOGGLE',
  GROUP_TOGGLE = 'GROUP_TOGGLE',
  NEW_TRIP = 'NEW_TRIP';

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
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case G_ICON_CHANGE:
      return Object.assign({}, state, { gIcon: action.payload });
    case GROUP_TOGGLE:
      return Object.assign({}, state, { groupOpen: action.payload });
    case NOTI_TOGGLE:
      return Object.assign({}, state, { notiOpen: action.payload });
    case NEW_TRIP:
      return Object.assign({}, state, { newTripOpen: action.payload })
    default:
      return state;
  }
};
