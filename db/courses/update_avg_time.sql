UPDATE geo_courses
SET mean_completion_time = $2
WHERE course_id = $1;

SELECT * FROM geo_courses
ORDER BY course_id;