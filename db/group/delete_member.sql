delete from groups
where user_id = $1 and trip_id = $2;