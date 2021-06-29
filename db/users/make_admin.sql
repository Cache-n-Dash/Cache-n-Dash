UPDATE geo_users
SET isadmin = TRUE
WHERE user_id = $1;

SELECT * FROM geo_users
ORDER BY username;