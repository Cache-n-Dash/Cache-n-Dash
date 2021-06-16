SELECT * FROM geo_locations l
RIGHT OUTER JOIN geo_courses c ON l.location_id = c.location_id_1;
