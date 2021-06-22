SELECT avg(comp_time) FROM geo_activities
WHERE completed = TRUE AND course_id = $1 AND comp_time IS NOT NULL;