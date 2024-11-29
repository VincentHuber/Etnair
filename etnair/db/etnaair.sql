-- Table : users
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    picture VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    host_started BOOLEAN DEFAULT FALSE,
    host_ended BOOLEAN DEFAULT FALSE
);

-- Table : ads
CREATE TABLE ads (
    id INT PRIMARY KEY,
    picture VARCHAR(255),
    user_id INT NOT NULL,
    property_name VARCHAR(255) NOT NULL,
    description TEXT,
    num_guest INT,
    area INT,
    available_date INT,
    nightly_price INT,
    rate_average DECIMAL(3,2),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table : bookings
CREATE TABLE bookings (
    id INT PRIMARY KEY,
    ad_id INT NOT NULL,
    user_id INT NOT NULL,
    num_traveler INT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    FOREIGN KEY (ad_id) REFERENCES ads(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table : reviews
CREATE TABLE reviews (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    ads_id INT NOT NULL,
    stars INT CHECK (stars BETWEEN 1 AND 5),
    opinion TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (ads_id) REFERENCES ads(id)
);