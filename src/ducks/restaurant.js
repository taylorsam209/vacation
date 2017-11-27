import axios from 'axios';
// import swal from 'sweetalert';

const initialState = {
    listing: [],
    currentRestaurant: [],
    user: {},
    yelpId: '',
    reviews: {}
}

const FULFILLED = '_FULFILLED';
const SEARCH_RESTAURANTS = 'SEARCH_RESTAURANTS';
const ADD_RESTAURANT = 'ADD_RESTAURANT';
const GET_RESTAURANT = "GET_RESTAURANT";
const GET_USER = "GET_USER";
const CLEAR_LISTINGS = "CLEAR_LISTINGS";
const CLEAR_RESTAURANT = "CLEAR_RESTAURANT";
const GET_REVIEWS = 'GET_REVIEWS';
const CLEAR_REVIEWS = 'CLEAR_REVIEWS';

export function clearListings() {
    return {
        type: CLEAR_LISTINGS,
        payload: []
    }
}

export function clearRestaurant() {
    return {
        type: CLEAR_RESTAURANT,
        payload: []
    }
}

export function clearReviews() {
    return {
        type: CLEAR_REVIEWS,
        payload: {}
    }
}

export function searchRestaurants(location) {
    let listing = axios.get(`/api/restaurants/${location}`)
        .then(response => {
            return response.data
        })
    return {
        type: SEARCH_RESTAURANTS,
        payload: listing
    }
}

export function getRestaurant(id) {
    let restaurant = axios.get(`/api/restaurant/${id}`)
        .then(response => {
            return response.data
        })
    return {
        type: GET_RESTAURANT,
        payload: restaurant
    }
}

export function getReviews(id) {
    let reviews = axios.get(`/api/restaurant/reviews/${id}`)
        .then(response => {
            return response.data
        })
    return {
        type: GET_REVIEWS,
        payload: reviews
    }
}

export function getCurrentUser() {
    let user = axios.get('/auth/me').then(response => {
        console.log(response.data);
        return response.data
    })
    return {
        type: GET_USER,
        payload: user
    }
}

export function addRestaurant(dayId, yelpId) {
    console.log("Add Restaurant Function", dayId)
    const data = {
        dayId: dayId,
        yelpId: yelpId
    }
    axios.post('/api/restaurant', data).then(response => {
        console.log(response.data)
        return response.data;
    })
    return {
        type: ADD_RESTAURANT
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_RESTAURANTS + FULFILLED:
            return Object.assign({}, state, { listing: action.payload })
        case GET_RESTAURANT + FULFILLED:
            return Object.assign({}, state, { currentRestaurant: action.payload })
        case GET_REVIEWS + FULFILLED:
            return Object.assign({}, state, { reviews: action.payload })
        case GET_USER + FULFILLED:
            return Object.assign({}, state, { user: action.payload })
        case ADD_RESTAURANT + FULFILLED:
            return Object.assign({}, state)
        case CLEAR_LISTINGS:
            return Object.assign({}, state, { listings: action.payload })
        case CLEAR_RESTAURANT:
            return Object.assign({}, state, { currentRestaurant: action.payload })
        case CLEAR_REVIEWS:
            return Object.assign({}, state, { reviews: action.payload })
        default:
            return state;
    }
}