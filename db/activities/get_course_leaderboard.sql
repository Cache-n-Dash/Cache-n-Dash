SELECT * FROM geo_activities
WHERE course_id = $1 AND completed = TRUE AND end_time IS NOT NULL
ORDER BY (end_time - start_time) ASC;