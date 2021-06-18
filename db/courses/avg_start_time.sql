-- SELECT avg(end_time - start_time) FROM geo_activities
-- WHERE course_id = $1 AND end_time IS NOT NULL;

SELECT avg(time_stamp) FROM geo_activity_locs l
JOIN geo_activities a ON l.activity_id = a.activity_id
WHERE l.start_end = 'START' AND a.course_id = $1;