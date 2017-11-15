create table trips(
trip_id serial primary key,
user_id int,
date text,
trip_name TEXT,
trip_code varchar(5),
trip_location text,
trip_details text
)