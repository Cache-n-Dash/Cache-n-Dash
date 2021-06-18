UPDATE geo_activities
SET comp_time = $2
WHERE activity_id = $1;

SELECT * FROM geo_activities
WHERE activity_id = $1;