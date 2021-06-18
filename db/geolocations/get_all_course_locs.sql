-- SELECT * FROM geo_locations l
-- RIGHT OUTER JOIN geo_courses c
-- ON l.location_id = c.location_id_1 OR l.location_id = c.location_id_2 OR l.location_id = c.location_id_3 OR l.location_id = c.location_id_4 OR l.location_id = c.location_id_5
-- WHERE c.course_id = $1;

SELECT * FROM geo_locations l
RIGHT OUTER JOIN geo_course_locs c ON l.location_id = c.location_id
WHERE c.course_id = $1;