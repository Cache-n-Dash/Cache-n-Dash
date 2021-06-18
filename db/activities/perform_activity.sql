INSERT INTO geo_activity_locs (activity_id,cloc_id,time_stamp,seg_time,start_end)
VALUES ($1,$2,$3,$4,$5);

UPDATE geo_activities
CASE
    WHEN ($5 = 'END') THEN SET completed = 'TRUE'
END
WHERE activity_id = $1;

-- SELECT time_stamp FROM geo_activity_locs al
-- INNER JOIN geo_course_locs cl ON al.cloc_id = cl.cloc_id
-- INNER JOIN geo_courses c ON cl.course_id = c.course_id
-- WHERE al.activity_id = $1 AND 
--     CASE
--         WHEN ($5 > 1) THEN cl.location_num = $5-1
--         WHEN ($5 = 1) THEN cl.location_num = c.locations
--     END;