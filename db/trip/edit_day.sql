UPDATE days
SET date = $1, day_name = $3
WHERE day_id = $2;