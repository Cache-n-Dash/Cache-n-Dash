SELECT * FROM geo_activities
WHERE course_id = $1 AND completed = TRUE AND end_time IS NOT NULL
ORDER BY (end_time - start_time) ASC;

-- SELECT * FROM geo_activities a
-- JOIN geo_users u ON a.user_id = u.user_id
-- WHERE a.course_id = $1 AND a.completed = TRUE AND a.comp_time IS NOT NULL
-- ORDER BY a.comp_time ASC;