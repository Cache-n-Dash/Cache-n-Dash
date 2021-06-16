DROP TABLE IF EXISTS geo_activities;
DROP TABLE IF EXISTS geo_courses;
DROP TABLE IF EXISTS geo_locations;
DROP TABLE IF EXISTS geo_users;

CREATE TABLE geo_users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    email VARCHAR(50),
    password VARCHAR(100),
    isAdmin BOOLEAN
);

CREATE TABLE geo_locations (
    location_id SERIAL PRIMARY KEY,
    location_name VARCHAR(100),
    latitude DECIMAL(8,6),
    longitude DECIMAL(9,6)
);

CREATE TABLE geo_courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100),
    locations INT,
    mean_completion_time INT,
    location_id_1 INT REFERENCES geo_locations(location_id),
    location_id_2 INT REFERENCES geo_locations(location_id),
    location_id_3 INT REFERENCES geo_locations(location_id),
    location_id_4 INT REFERENCES geo_locations(location_id),
    location_id_5 INT REFERENCES geo_locations(location_id),
    distance_12 DECIMAL(7,3),
    distance_23 DECIMAL(7,3),
    distance_34 DECIMAL(7,3),
    distance_45 DECIMAL(7,3),
    distance_final DECIMAL(7,3),
);

CREATE TABLE geo_activities (
    activity_id SERIAL PRIMARY KEY,
    course_id INT REFERENCES geo_courses(course_id),
    user_id INT REFERENCES geo_users(user_id),
    date VARCHAR(30),
    completed BOOLEAN,
    start_time BIGINT,
    time_2 BIGINT,
    time_3 BIGINT,
    time_4 BIGINT,
    time_5 BIGINT,
    end_time BIGINT
);