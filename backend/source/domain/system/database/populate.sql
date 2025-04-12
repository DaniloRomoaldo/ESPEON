CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE permissions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE user_permission (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid,
    permission_id uuid,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_permission FOREIGN KEY (permision_id) REFERENCES permissions(id)
);


CREATE TABLE exercise_list (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    db_name VARCHAR(255),
    db_path VARCHAR(255),
    created_by uuid,
    created_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE exercise (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    exercise_list_id uuid,
    name VARCHAR(255) UNIQUE not NULL,
    description TEXT NOT NULL,
    solution_query TEXT NOT NULL,
    created_at TIMESTAMP,
    CONSTRAINT fk_exercise_list FOREIGN KEY (exercise_list_id) REFERENCES exercise_list(id)
);

