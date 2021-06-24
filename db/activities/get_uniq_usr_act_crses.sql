SELECT DISTINCT ON (course_id) course_id FROM geo_activities
WHERE user_id = $1 AND completed = TRUE
ORDER BY activity_date DESC;