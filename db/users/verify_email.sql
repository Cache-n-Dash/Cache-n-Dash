UPDATE geo_users
SET verified = true
WHERE email = $1
RETURNING *