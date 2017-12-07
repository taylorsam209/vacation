const axios = require('axios');

const getAllEvents = (dayId) => {

    return
    console.log('func', dayId);
    const db = req.app.get('db');
    db.day.get_all_rentals(dayId)
        .then(rentals => {
            arr.push(rentals)
            db.day.get_all_lodging(dayId)
                .then(lodging => {
                    arr.push(lodging);
                    db.day.get_all_flights(dayId)
                        .then(flights => {
                            arr.push(flights);
                            db.day.get_all_activities(dayId)
                                .then(activities => {
                                    arr.push(activities)
                                    let newArr = [].concat.apply([], arr)
                                    res.status(200).send(newArr);
                                })
                        })
                })
        })

}

module.exports = {

    getEvents: (req, res) => {
        const db = req.app.get('db');
        const dayId = req.params.id;
        const arr = [];
        var count = 0;

        db.day.get_all_rentals(dayId)
            .then(rentals => {
                arr.push(rentals)
                db.day.get_all_lodging(dayId)
                    .then(lodging => {
                        arr.push(lodging);
                        db.day.get_all_flights(dayId)
                            .then(flights => {
                                arr.push(flights);
                                db.day.get_all_activities(dayId)
                                    .then(activities => {
                                        arr.push(activities)
                                        let newArr = [].concat.apply([], arr)
                                        res.status(200).send(newArr);
                                    })
                            })
                    })
            })
    },

    getFlight: (req, res) => {
        const db = req.app.get('db');
        const flightId = req.params.id;

        db.day.get_flight(flightId)
            .then(flight => res.status(200).send(flight))
            .catch(() => res.status(500).send());
    },

    editFlight: (req, res) => {
        const db = req.app.get('db');
        const arr = [];
        const { confirmation, airline_name, flight_id} = req.body;
        console.log(req.body)

        db.day.edit_flight([confirmation, airline_name, flight_id])
            .then(() => {
                console.log("Success")
                db.day.get_flight(flight_id)
                    .then(flight => {
                        let dayId = flight[0].day_id;
                        db.day.get_all_rentals(dayId)
                            .then(rentals => {
                                arr.push(rentals)
                                db.day.get_all_lodging(dayId)
                                    .then(lodging => {
                                        arr.push(lodging);
                                        db.day.get_all_flights(dayId)
                                            .then(flights => {
                                                arr.push(flights);
                                                db.day.get_all_activities(dayId)
                                                    .then(activities => {
                                                        arr.push(activities)
                                                        let newArr = [].concat.apply([], arr)
                                                        res.status(200).send(newArr);
                                                    })
                                            })
                                    })
                            })
                    })
            })
            .catch(() => res.status(500).send('Cannot edit the specified flight.'))
    },

    editRentalCar: (req, res) => {
        const db = req.app.get('db');
        const { rental_company, rental_details, rental_id, rental_name } = req.body;
        const arr = [];

        db.day.edit_rental_car([rental_company, rental_details, rental_id, rental_name])
            .then(() => {
                db.day.get_rental_car(rental_id)
                    .then(rental => {
                        let dayId = rental[0].day_id;
                        db.day.get_all_rentals(dayId)
                            .then(rentals => {
                                arr.push(rentals)
                                db.day.get_all_lodging(dayId)
                                    .then(lodging => {
                                        arr.push(lodging);
                                        db.day.get_all_flights(dayId)
                                            .then(flights => {
                                                arr.push(flights);
                                                db.day.get_all_activities(dayId)
                                                    .then(activities => {
                                                        arr.push(activities)
                                                        let newArr = [].concat.apply([], arr)
                                                        res.status(200).send(newArr);
                                                    })
                                            })
                                    })
                            })
                    })
            })
            .catch(() => res.status(500).send('Cannot edit the specified rental car.'))
    },

    editActivity: (req, res) => {
        const db = req.app.get('db');
        const { activity_name, activity_details, activity_id, activities_name } = req.body;
        const arr = [];

        db.day.edit_activity([activity_name, activity_details, activity_id, activities_name])
            .then(() => {
                db.day.get_activity(activity_id)
                    .then(activity => {
                        let dayId = activity[0].day_id;
                        db.day.get_all_rentals(dayId)
                            .then(rentals => {
                                arr.push(rentals)
                                db.day.get_all_lodging(dayId)
                                    .then(lodging => {
                                        arr.push(lodging);
                                        db.day.get_all_flights(dayId)
                                            .then(flights => {
                                                arr.push(flights);
                                                db.day.get_all_activities(dayId)
                                                    .then(activities => {
                                                        arr.push(activities)
                                                        let newArr = [].concat.apply([], arr)
                                                        res.status(200).send(newArr);
                                                    })
                                            })
                                    })
                            })
                    })
            })
            .catch(() => res.status(500).send('Cannot edit the specified activity.'))
    },

    editLodging: (req, res) => {
        const db = req.app.get('db');
        const { lodging_name, lodging_details, lodging_id, event_name } = req.body;
        const arr = [];

        db.day.edit_lodging([lodging_name, lodging_details, lodging_id, event_name])
            .then(() => {
                db.day.get_lodging(lodging_id)
                    .then(lodging => {
                        let dayId = lodging[0].day_id;
                        db.day.get_all_rentals(dayId)
                            .then(rentals => {
                                arr.push(rentals)
                                db.day.get_all_lodging(dayId)
                                    .then(lodging => {
                                        arr.push(lodging);
                                        db.day.get_all_flights(dayId)
                                            .then(flights => {
                                                arr.push(flights);
                                                db.day.get_all_activities(dayId)
                                                    .then(activities => {
                                                        arr.push(activities)
                                                        let newArr = [].concat.apply([], arr)
                                                        res.status(200).send(newArr);
                                                    })
                                            })
                                    })
                            })
                    })
            })
            .catch(() => res.status(500).send('Cannot edit the specified lodging.'))
    },

    addLodging: (req, res) => {
        const db = req.app.get('db');
        const { lodging_name, lodging_details, day_id, event_name } = req.body;
        const arr = [];

        db.day.add_lodging([lodging_name, lodging_details, day_id, event_name])
            .then(() => {
                db.day.get_all_rentals(day_id)
                    .then(rentals => {
                        arr.push(rentals)
                        db.day.get_all_lodging(day_id)
                            .then(lodging => {
                                arr.push(lodging);
                                db.day.get_all_flights(day_id)
                                    .then(flights => {
                                        arr.push(flights);
                                        db.day.get_all_activities(day_id)
                                            .then(activities => {
                                                arr.push(activities)
                                                let newArr = [].concat.apply([], arr)
                                                res.status(200).send(newArr);
                                            })
                                    })
                            })
                    })
            })
            .catch(() => res.status(500).send('Cannot add this lodging.'))
    },

    addFlight: (req, res) => {
        const db = req.app.get('db');
        const { confirmation, airline_name, day_id, flight_name } = req.body;
        const arr = [];

        db.day.add_flight([confirmation, airline_name, day_id, flight_name])
            .then(() => {
                db.day.get_all_rentals(day_id)
                    .then(rentals => {
                        arr.push(rentals)
                        db.day.get_all_lodging(day_id)
                            .then(lodging => {
                                arr.push(lodging);
                                db.day.get_all_flights(day_id)
                                    .then(flights => {
                                        arr.push(flights);
                                        db.day.get_all_activities(day_id)
                                            .then(activities => {
                                                arr.push(activities)
                                                let newArr = [].concat.apply([], arr)
                                                res.status(200).send(newArr);
                                            })
                                    })
                            })
                    })
            })
            .catch(() => res.status(500).send('Cannot add this flight.'))
    },

    addRentalCar: (req, res) => {
        const db = req.app.get('db');
        const { rental_company, rental_details, day_id, rental_name } = req.body;
        const arr = [];

        db.day.add_rental_car([rental_company, rental_details, day_id, rental_name])
            .then(() => {
                db.day.get_all_rentals(day_id)
                    .then(rentals => {
                        arr.push(rentals)
                        db.day.get_all_lodging(day_id)
                            .then(lodging => {
                                arr.push(lodging);
                                db.day.get_all_flights(day_id)
                                    .then(flights => {
                                        arr.push(flights);
                                        db.day.get_all_activities(day_id)
                                            .then(activities => {
                                                arr.push(activities)
                                                let newArr = [].concat.apply([], arr)
                                                res.status(200).send(newArr);
                                            })
                                    })
                            })
                    })
            })
            .catch(() => res.status(500).send('Cannot add this rental car.'))
    },

    addActivity: (req, res) => {
        const db = req.app.get('db');
        const { activity_name, activity_details, day_id, activities_name } = req.body;
        const arr = [];

        db.day.add_activity([activity_name, activity_details, day_id, activities_name])
            .then(() => {
                db.day.get_all_rentals(day_id)
                    .then(rentals => {
                        arr.push(rentals)
                        db.day.get_all_lodging(day_id)
                            .then(lodging => {
                                arr.push(lodging);
                                db.day.get_all_flights(day_id)
                                    .then(flights => {
                                        arr.push(flights);
                                        db.day.get_all_activities(day_id)
                                            .then(activities => {
                                                arr.push(activities)
                                                let newArr = [].concat.apply([], arr)
                                                res.status(200).send(newArr);
                                            })
                                    })
                            })
                    })
            })
            .catch(() => res.status(500).send('Cannot add this activity.'))
    },

    deleteLodging: (req, res) => {
        const db = req.app.get('db')
        const lodgingId = req.params.id;
        const arr = [];

        db.day.get_lodging([lodgingId])
            .then(lodging => {
                let day_id = lodging[0].day_id;
                db.day.delete_lodging(lodgingId)
                    .then(() => {
                        db.day.get_all_rentals(day_id)
                            .then(rentals => {
                                arr.push(rentals)
                                db.day.get_all_lodging(day_id)
                                    .then(lodging => {
                                        arr.push(lodging);
                                        db.day.get_all_flights(day_id)
                                            .then(flights => {
                                                arr.push(flights);
                                                db.day.get_all_activities(day_id)
                                                    .then(activities => {
                                                        arr.push(activities)
                                                        let newArr = [].concat.apply([], arr)
                                                        res.status(200).send(newArr);
                                                    })
                                            })
                                    })
                            })
                    })
            })
            .catch(() => res.status(500).send("Cannot delete day."))
    },

    deleteFlight: (req, res) => {
        const db = req.app.get('db')
        const flightId = req.params.id;
        const arr = [];

        db.day.get_flight([flightId])
            .then(flight => {
                let day_id = flight[0].day_id;
                db.day.delete_flight(flightId)
                    .then(() => {
                        db.day.get_all_rentals(day_id)
                            .then(rentals => {
                                arr.push(rentals)
                                db.day.get_all_lodging(day_id)
                                    .then(lodging => {
                                        arr.push(lodging);
                                        db.day.get_all_flights(day_id)
                                            .then(flights => {
                                                arr.push(flights);
                                                db.day.get_all_activities(day_id)
                                                    .then(activities => {
                                                        arr.push(activities)
                                                        let newArr = [].concat.apply([], arr)
                                                        res.status(200).send(newArr);
                                                    })
                                            })
                                    })
                            })
                    })
                    .catch(() => res.status(500).send('Cannot delete lodging.'))
            })
    },

    deleteRentalCar: (req, res) => {
        const db = req.app.get('db')
        const rentalId = req.params.id;
        const arr = [];

        db.day.get_rental_car([rentalId])
            .then(rentalCar => {
                let day_id = rentalCar[0].day_id;
                db.day.delete_rental_car(rentalId)
                    .then(() => {
                        db.day.get_all_rentals(day_id)
                            .then(rentals => {
                                arr.push(rentals)
                                db.day.get_all_lodging(day_id)
                                    .then(lodging => {
                                        arr.push(lodging);
                                        db.day.get_all_flights(day_id)
                                            .then(flights => {
                                                arr.push(flights);
                                                db.day.get_all_activities(day_id)
                                                    .then(activities => {
                                                        arr.push(activities)
                                                        let newArr = [].concat.apply([], arr)
                                                        res.status(200).send(newArr);
                                                    })
                                            })
                                    })
                            })
                    })
                    .catch(() => res.status(500).send('Cannot delete lodging.'))
            })
    },

    deleteActivity: (req, res) => {
        const db = req.app.get('db')
        const activityId = req.params.id;
        const arr = []

        db.day.get_activity([activityId])
            .then(activity => {
                let day_id = activity[0].day_id
                db.day.delete_activity(activityId)
                    .then(() => {
                        db.day.get_all_rentals(day_id)
                            .then(rentals => {
                                arr.push(rentals)
                                db.day.get_all_lodging(day_id)
                                    .then(lodging => {
                                        arr.push(lodging);
                                        db.day.get_all_flights(day_id)
                                            .then(flights => {
                                                arr.push(flights);
                                                db.day.get_all_activities(day_id)
                                                    .then(activities => {
                                                        arr.push(activities)
                                                        let newArr = [].concat.apply([], arr)
                                                        res.status(200).send(newArr);
                                                    })
                                            })
                                    })
                            })
                    })
                    .catch(() => res.status(500).send('Cannot delete lodging.'))
            })
    }
}