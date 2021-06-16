-- variables are activity_id, the timestamp to add, the location where the timestamp should be saved, and the completed boolean
UPDATE geo_activities
CASE
    WHEN ($3 = 2) THEN SET time_2 = $2
    WHEN ($3 = 3) THEN SET time_3 = $2
    WHEN ($3 = 4) THEN SET time_4 = $2
    WHEN ($3 = 5) THEN SET time_5 = $2
    WHEN ($3 = 1) THEN SET end_time = $2, completed = $4
END
WHERE activity_id = $1;