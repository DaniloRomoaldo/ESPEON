CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email varchar(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE permissions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL
);

CREATE TABLE user_permission (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid,
    permission_id uuid,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_permission FOREIGN KEY (permision_id) REFERENCES permissions(id)
);