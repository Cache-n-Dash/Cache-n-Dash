-- SELECT DISTINCT ON (course_id) course_id FROM geo_activities
-- WHERE user_id = $1 AND completed = TRUE
-- ORDER BY activity_date DESC;

SELECT * FROM (
    SELECT DISTINCT ON (a.course_id) * FROM geo_activities a
    JOIN geo_courses c ON a.course_id = c.course_id
    WHERE a.user_id = $1 AND a.completed = TRUE
    ORDER BY a.course_id ASC
) s
ORDER BY s.activity_date DESC;