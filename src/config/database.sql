CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  googleId VARCHAR(255),
  provider VARCHAR(255) NOT NULL,
  isVerified BOOLEAN NOT NULL DEFAULT FALSE,
  created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
)

CREATE TABLE reset_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  access_token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE investments (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT(11) NOT NULL,
  investment_packageId INT(11) NOT NULL,
  amountPerUnit DECIMAL(10, 2) NOT NULL,
  units INT(11) NOT NULL,
  isAvailable BOOLEAN NOT NULL DEFAULT TRUE,
  total_investment INT(100) NOT NULL,
);

CREATE TYPE "status_type" AS ENUM (
  "pending",
  "debit",
  "active",
  "completed",
);

CREATE TABLE investment_package (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  farm_name VARCHAR(255) NOT NULL,
  investment_name VARCHAR(255) NOT NULL,
  amountPerUnit DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  durations INT(11) NOT NULL,
  units INT(11) NOT NULL,
  status status_type NOT NULL DEFAULT ("pending"),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);


ALTER TABLE "investments" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "investments" ADD FOREIGN KEY ("investment_packageId") REFERENCES "investment_package" ("id");

ALTER TABLE "reset_tokens" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");