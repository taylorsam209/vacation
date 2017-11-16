update lodging
set lodging_name = $1,
lodging_details = $2
where day_id = $3;