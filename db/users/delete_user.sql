DELETE FROM geo_activity_locs al
    USING geo_activities a
WHERE al.activity_id = a.activity_id AND
    a.user_id = $1;

DELETE FROM geo_activities
WHERE user_id = $1;

DELETE FROM geo_users
WHERE user_id = $1;