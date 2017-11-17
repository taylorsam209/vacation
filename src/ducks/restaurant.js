import axios from 'axios';
// import swal from 'sweetalert';

const initialState = {
    listing: [],
    currentRestaurant: [],
    user: {},
    yelpId: 0
}

const FULFILLED = '_FULFILLED';
const SEARCH_RESTAURANTS = 'SEARCH_RESTAURANTS';
const ADD_RESTAURANT = 'ADD_RESTAURANT';
const GET_RESTAURANT = "GET_RESTAURANT";
const GET_USER = "GET_USER";
const CLEAR_LISTINGS = "CLEAR_LISTINGS";
const CLEAR_RESTAURANT = "CLEAR_RESTAURANT";

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

export function addRestaurant(userId, restaurant) {
    console.log("this is addfav", userId)
    const data = {
        userId: userId,
        yelpId: restaurant
    }
    if (data.userId === undefined) {
        // swal("User not found.", "Please login to add favorite restaurants.", "error")
        alert("User not found. Login.")
        return {
            type: ADD_RESTAURANT
        }
    } else
        axios.post('/api/addRestaurant', data).then(response => {
            console.log(response.data)
            if (response.data === "success") {
                // swal("Added to favorites!", "Go to profile to view your list!", "success")
                alert("Add successful")
            }
            else {
                // swal("Attention", "Business already exists in your profile.", "warning")
                alert("restaurant exist!")
            }
        }).catch(err => {
            console.log("Create user error", err)
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
        case GET_USER + FULFILLED:
            return Object.assign({}, state, { user: action.payload })
        case ADD_RESTAURANT + FULFILLED:
            return Object.assign({}, state)
        case CLEAR_LISTINGS:
            return Object.assign({}, state, { listings: action.payload })
        case CLEAR_RESTAURANT:
            return Object.assign({}, state, { currentRestaurant: action.payload })
        default:
            return state;          
    }
}