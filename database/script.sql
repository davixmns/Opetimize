CREATE DATABASE IF NOT EXISTS opetimize;
USE opetimize;

CREATE TABLE users
(
    user_id       INT PRIMARY KEY AUTO_INCREMENT,
    name          VARCHAR(50)  NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password      VARCHAR(100) NOT NULL,
    profile_image VARCHAR(500)
);

CREATE TABLE purchases
(
    purchase_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id     INT         NOT NULL,
    name        VARCHAR(50) NOT NULL,
    price       FLOAT       NOT NULL,
    weight      FLOAT       NOT NULL,
    date        DATE        NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE pets
(
    pet_id  INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT         NOT NULL,
    breed   VARCHAR(50) NOT NULL,
    name    VARCHAR(50) NOT NULL,
    age     INT         NOT NULL,
    weight  FLOAT       NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);
