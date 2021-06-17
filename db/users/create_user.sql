INSERT INTO geo_users
(username, email, password, isAdmin, verified)
VALUES
($1, $2, $3, false, false)
RETURNING *;