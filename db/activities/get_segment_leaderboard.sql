-- SELECT * FROM geo_activities a
-- JOIN geo_courses c ON a.course_id = c.course_id
-- WHERE
--     CASE
--         WHEN (c.location_id_1 = $1) AND (c.location_id_2 = $2) 
--             THEN c.location_id_1 = $1 AND c.location_id_2 = $2 AND a.time_2 IS NOT NULL 
--                 ORDER BY (a.time_2 - a.start_time) ASC
--         WHEN (c.location_id_2 = $1) AND (c.location_id_3 = $2) 
--             THEN c.location_id_2 = $1 AND c.location_id_3 = $2 AND a.time_3 IS NOT NULL AND a.time_2 IS NOT NULL
--                 ORDER BY (a.time_3 - a.time_2) ASC
--         WHEN (c.location_id_3 = $1) AND (c.location_id_4 = $2) 
--             THEN c.location_id_3 = $1 AND c.location_id_4 = $2 AND a.time_4 IS NOT NULL AND a.time_3 IS NOT NULL
--                 ORDER BY (a.time_4 - a.time_3) ASC
--         WHEN (c.location_id_4 = $1) AND (c.location_id_5 = $2) 
--             THEN c.location_id_4 = $1 AND c.location_id_5 = $2 AND a.time_5 IS NOT NULL AND a.time_4 IS NOT NULL
--                 ORDER BY (a.time_5 - a.time_4) ASC
--         WHEN (c.location_id_1 = $2) AND (c.location_id_5 = $1) AND (c.locations = 5) 
--             THEN c.location_id_5 = $1 AND c.location_id_1 = $2 AND a.end_time IS NOT NULL AND a.time_5 IS NOT NULL
--                 ORDER BY (a.end_time - a.time_5) ASC
--         WHEN (c.location_id_1 = $2) AND (c.location_id_4 = $1) AND (c.locations = 4) 
--             THEN c.location_id_4 = $1 AND c.location_id_1 = $2 AND a.end_time IS NOT NULL AND a.time_4 IS NOT NULL
--                 ORDER BY (a.end_time - a.time_4) ASC
--         WHEN (c.location_id_1 = $2) AND (c.location_id_3 = $1) AND (c.locations = 3) 
--             THEN c.location_id_3 = $1 AND c.location_id_1 = $2 AND a.end_time IS NOT NULL AND a.time_3 IS NOT NULL
--                 ORDER BY (a.end_time - a.time_3) ASC
--         WHEN (c.location_id_1 = $2) AND (c.location_id_2 = $1) AND (c.locations = 2) 
--             THEN c.location_id_2 = $1 AND c.location_id_1 = $2 AND a.end_time IS NOT NULL AND a.time_2 IS NOT NULL
--                 ORDER BY (a.end_time - a.time_2) ASC
--     END;

SELECT a.activity_id, a.course_id, a.activity_date, al.seg_time, u.username, l.location_id, cl.seg_dist, l.location_name, l.latitude, l.longitude FROM geo_activities a
INNER JOIN geo_activity_locs al ON a.activity_id = al.activity_id
INNER JOIN geo_users u ON a.user_id = u.user_id
INNER JOIN geo_course_locs cl ON al.cloc_id = cl.cloc_id
INNER JOIN geo_locations l ON cl.location_id = l.location_id
WHERE l.location_id = $1 AND cl.course_id = $2 AND al.seg_time IS NOT NULL
ORDER BY al.seg_time ASC;