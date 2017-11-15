create table messages (
message_id serial primary key,
user_id INT,
trip_id INT,
message_text text,
date text 
)