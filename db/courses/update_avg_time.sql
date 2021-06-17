UPDATE geo_courses
SET mean_completion_time = $2
WHERE course_id = $1;