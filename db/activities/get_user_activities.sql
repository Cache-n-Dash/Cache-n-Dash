SELECT * FROM geo_activities a
JOIN geo_courses c ON a.course_id = c.course_id
WHERE a.user_id = $1 AND a.completed = TRUE AND c.course_id = $2;