const axios = require('axios');

module.exports = {

    getEvents: (req, res) => {
        const db = req.app.get('db');
        const dayId = req.params.id;
        const arr = [];
        var count = 0;

        db.day.get_all_rentals(dayId)
            .then(rentals => {
                arr.push(rentals)
                db.day.get_all_restaurants(dayId)
                    .then(yelpIdList => {
                        let favListing = [];
                        console.log("YelpID List", yelpIdList)
                        if (!yelpIdList.length) { res.status(200).send(favListing) }
                        for (let i = 0; i < yelpIdList.length; i++) {
                            let yelpId = yelpIdList[i].yelp_id;
                            GetMyResourceData(yelpId);
                        }

                        function GetMyResourceData(yelpId) {
                            axios.get(`https://api.yelp.com/v3/businesses/${yelpId}`,
                                { headers: { "Authorization": `Bearer ${process.env.YELP_ACCESS_TOKEN}` } })
                                .then(response => {
                                    console.log("Running")
                                    console.log(response.data)
                                    count++
                                    console.log(count, yelpIdList.length)
                                    favListing.push(response.data)
                                    if (count === yelpIdList.length) {
                                        arr.push(response.data)
                                    }
                                })
                                .catch(err => {
                                    console.log(count, "err")
                                    count++
                                })
                        }
                        console.log('this is favListing', favListing)

                        // arr.push(restaurants);
                        db.day.get_all_lodging(dayId)
                            .then(lodging => {
                                arr.push(lodging);
                                db.day.get_all_flights(dayId)
                                    .then(flights => {
                                        arr.push(flights);
                                        db.day.get_all_activities(dayId)
                                            .then(activities => {
                                                arr.push(activities)
                                                res.status(200).send(arr);
                                            })
                                    })
                            })
                    })
            })
    },

    editFlight: (req, res) => {
        const db = req.app.get('db');
        const { confirmation, airline_name, day_id } = req.body;

        db.day.edit_flight([confirmation, airline_name, day_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    editRentalCar: (req, res) => {
        const db = req.app.get('db');
        const { rental_company, rental_details, day_id } = req.body;

        db.day.edit_rental_car([rental_company, rental_details, day_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    editActivity: (req, res) => {
        const db = req.app.get('db');
        const { activity_name, activity_details, day_id } = req.body;

        db.day.edit_activity([activity_name, activity_details, day_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    editLodging: (req, res) => {
        const db = req.app.get('db');
        const { lodging_name, lodging_details, day_id } = req.body;

        db.day.edit_lodging([lodging_name, lodging_details, day_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    }
}