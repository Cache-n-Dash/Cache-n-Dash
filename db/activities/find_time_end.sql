SELECT time_stamp FROM geo_activity_locs
WHERE activity_id = $1 AND start_end = 'END';