update activities
set activity_name = $1,
activity_details = $2,
activities_name = $4
where activity_id = $3;