update flights
set confirmation = $1,
airline_name = $2
where flight_id = $3;