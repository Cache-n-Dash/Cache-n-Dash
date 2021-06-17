SELECT * FROM geo_locations
WHERE location_id = $1 OR location_id = $2;