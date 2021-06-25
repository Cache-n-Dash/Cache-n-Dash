-- SELECT DISTINCT ON (course_id) course_id FROM geo_activities
-- WHERE user_id = $1 AND completed = TRUE
-- ORDER BY activity_date DESC;

SELECT s.course_id FROM (
    SELECT DISTINCT ON (course_id) * FROM geo_activities
    WHERE user_id = $1 AND completed = TRUE
    ORDER BY course_id DESC
) s
ORDER BY s.activity_date DESC;