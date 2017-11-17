update flights
set confirmation = $1,
airline_name = $2
where day_id = $3;