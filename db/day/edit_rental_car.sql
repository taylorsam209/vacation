update rental_cars
set rental_company = $1,
rental_details = $2
where day_id = $3;