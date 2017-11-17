update activities
set activity_name = $1,
activity_details = $2
where day_id = $3;