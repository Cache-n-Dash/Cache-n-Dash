INSERT INTO geo_users
(username, email, password, isAdmin)
VALUES
($1, $2, $3, false)
RETURNING *;