INSERT INTO geo_activity_locs (activity_id,cloc_id,time_stamp,seg_time,start_end)
VALUES ($1,$2,$3,$4,$5);

UPDATE geo_activities
CASE
    WHEN ($5 = 'END') THEN SET completed = 'TRUE'
END
WHERE activity_id = $1;

SELECT * FROM geo_activity_locs
WHERE activity_id = $1;