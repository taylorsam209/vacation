axios = require("axios");

module.exports = {

    searchRestaurants: (req, res) => {
        const location = req.params.location
        axios.get(`https://api.yelp.com/v3/businesses/search?categories=restaurants&radius=20000&limit=50&location=${location}`,
            { headers: { "Authorization": `Bearer ${process.env.YELP_ACCESS_TOKEN}` } })
            .then(response => {
                res.status(200).send(response.data.businesses)
            })
    },

    getRestaurant: (req, res) => {
        axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}`,
            { headers: { "Authorization": `Bearer ${process.env.YELP_ACCESS_TOKEN}` } })
            .then((response) => res.status(200).send(response.data))
    },

    addRestaurant: (req, res) => {
        const db = req.app.get('db');
        const { day_id, yelp_id } = req.body;
        db.rest.add_restaurant([day_id, yelp_id])
            .then(() => res.status(200).send("Success"))
            .catch(() => res.status(500).send("Fail"))
    },

    getSavedRestaurants: (req, res) => {
        const db = req.app.get('db');
        var count = 0;
        const day_id = req.params.id;
        db.rest.get_restaurants(day_id)
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
                            count++
                            console.log(count, yelpIdList.length)
                            favListing.push(response.data)
                            if (count === yelpIdList.length) {
                                res.send(favListing)
                            }
                        })
                        .catch(err => {
                            console.log(count, "err")
                            count++
                        })
                }
                console.log(favListing)
            })
    },

    deleteRestaurant: (req, res) => {
        const db = req.app.get('db');
        const restaurantId = req.params.id;

        db.rest.delete_restaurant(restaurantId)
        .then(resp => {
            res.status(200).send("Restaurant successfully deleted.")
        })
        .catch(()=> res.status(500).send("Unable to delete restaurant"))
    }

    // deleteRestaurant: (req, res) => {
    //     const db = req.app.get('db');
    //     const {restaurant_id, day_id} = req.query;
    //     var count = 0;
    //     db.rest.delete_restaurant(restaurant_id)
    //         .then(response => {
    //             db.rest.get_restaurants(day_id)
    //                 .then(yelpIdList => {
    //                     let favListing = [];
    //                     console.log("YelpID List", yelpIdList)
    //                     if (!yelpIdList.length) { res.status(200).send(favListing) }
    //                     for (let i = 0; i < yelpIdList.length; i++) {
    //                         let yelpId = yelpIdList[i].yelp_id;
    //                         GetMyResourceData(yelpId);
    //                     }
    //                     function GetMyResourceData(yelpId) {
    //                         axios.get(`https://api.yelp.com/v3/businesses/${yelpId}`,
    //                             { headers: { "Authorization": `Bearer ${process.env.YELP_ACCESS_TOKEN}` } })
    //                             .then(response => {
    //                                 count++;
    //                                 favListing.push(response.data)
    //                                 if (count === yelpIdList.length) {
    //                                     res.send(favListing)
    //                                 }
    //                             })
    //                             .catch(err => {
    //                                 console.log(count, "err")
    //                                 count++
    //                             })
    //                     }
    //                     console.log(favListing)
    //                 })
    //         });
    // }

}