INSERT INTO geo_users
(username, email, password, admin)
VALUES
($1, $2, $3, false)
RETURNING *;