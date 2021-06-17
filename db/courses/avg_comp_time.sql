SELECT avg(end_time - start_time) FROM geo_activities
WHERE course_id = $1 AND end_time IS NOT NULL;