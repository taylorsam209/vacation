select rental_company, rental_id from rental_cars
where day_id = $1
union
select lodging_name, lodging_id from lodging
where day_id = $1
union
select activity_name, activity_id from activities
where day_id = $1
union
select airline_name, flight_id from flights
where day_id = $1
union
select yelp_id, restaurant_id from restaurants
where day_id = $1;