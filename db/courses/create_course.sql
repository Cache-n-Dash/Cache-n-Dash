-- INSERT INTO geo_courses (course_name,locations,location_id_1,location_id_2,location_id_3,location_id_4,location_id_5,distance_12,distance_23,distance_34,distance_45,distance_final)
-- VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);

INSERT INTO geo_courses (course_name,locations)
VALUES ($1,$2) RETURNING course_id;