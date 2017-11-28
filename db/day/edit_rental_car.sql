update rental_cars
set rental_company = $1,
rental_details = $2
where rental_id = $3;