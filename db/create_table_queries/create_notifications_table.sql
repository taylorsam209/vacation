create table notifications(
notification_id serial primary key,
trip_id int,
user_id int,
notification_text text
)