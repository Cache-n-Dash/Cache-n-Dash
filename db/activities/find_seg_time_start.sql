SELECT time_stamp FROM geo_activity_locs al
INNER JOIN geo_course_locs cl ON al.cloc_id = cl.cloc_id
INNER JOIN geo_courses c ON cl.course_id = c.course_id
WHERE al.activity_id = $1 AND 
    CASE
        WHEN ($2 > 1) THEN cl.location_num = $2-1
        WHEN ($2 = 1) THEN cl.location_num = c.locations
    END;