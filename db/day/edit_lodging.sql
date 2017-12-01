update lodging
set lodging_name = $1,
lodging_details = $2,
event_name = $4
where lodging_id = $3;