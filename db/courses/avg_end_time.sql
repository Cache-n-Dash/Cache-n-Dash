-- SELECT avg(time_stamp) FROM geo_activity_locs l
-- JOIN geo_activities a ON l.activity_id = a.activity_id
-- WHERE l.start_end = 'END' AND a.course_id = $1;

SELECT avg(comp_time) FROM geo_activities
WHERE completed = TRUE AND course_id = $1 AND comp_time IS NOT NULL;