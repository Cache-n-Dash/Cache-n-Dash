SELECT * FROM geo_activities
WHERE course_id = $1 AND completed = TRUE
ORDER BY (end_time-start_time) ASC;