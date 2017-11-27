update lodging
set lodging_name = $1,
lodging_details = $2
where lodging_id = $3;