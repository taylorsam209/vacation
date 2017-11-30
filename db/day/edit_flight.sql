update flights
set confirmation = $1,
airline_name = $2,
flight_name = $4,
where flight_id = $3;