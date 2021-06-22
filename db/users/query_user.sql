SELECT * FROM geo_users
WHERE lower(username) LIKE concat('%',$1,'%')
ORDER BY username;