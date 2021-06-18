DROP TABLE IF EXISTS geo_activity_locs;
DROP TABLE IF EXISTS geo_activities;
DROP TABLE IF EXISTS geo_course_locs;
DROP TABLE IF EXISTS geo_courses;
DROP TABLE IF EXISTS geo_locations;
DROP TABLE IF EXISTS geo_users;

CREATE TABLE geo_users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    email VARCHAR(50),
    password VARCHAR(100),
    isAdmin BOOLEAN,
    verified BOOLEAN
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
);

CREATE TABLE geo_course_locs (
    cloc_id SERIAL PRIMARY KEY,
    course_id INT REFERENCES geo_courses(course_id),
    location_id INT REFERNCES geo_locations(location_id),
    location_num INT,
    seg_dist DECIMAL(7,3)
);

CREATE TABLE geo_activities (
    activity_id SERIAL PRIMARY KEY,
    course_id INT REFERENCES geo_courses(course_id),
    user_id INT REFERENCES geo_users(user_id),
    activity_date VARCHAR(30),
    completed BOOLEAN,
    comp_time BIGINT
);

CREATE TABLE geo_activity_locs (
    actloc_id SERIAL PRIMARY KEY,
    activity_id INT REFERENCES geo_activities(activity_id),
    cloc_id INT REFERENCES geo_course_locs(cloc_id),
    time_stamp BIGINT,
    seg_time BIGINT,
    start_end VARCHAR(10)
);

-- probably not needed
-- CREATE TABLE geo_segments (
--     segment_id SERIAL PRIMARY KEY,
--     cloc_id_1 INT REFERENCES geo_course_locs(cloc_id),
--     cloc_id_2 INT REFERENCES geo_course_locs(cloc_id)
-- );