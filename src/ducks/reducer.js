import axios from "axios";

const initialState = {
  gIcon: false
}
    , G_ICON_CHANGE = 'G_ICON_CHANGE';

export function showGroup(bool){
  return {
    type: G_ICON_CHANGE,
    payload: bool
  };
}

export default function reducer(state = initialState, action){
  switch (action.type){
    case G_ICON_CHANGE:
      return Object.assign({}, state, {gIcon: action.payload});
    default:
      return state;
  }
};
