CREATE DATABASE IF NOT EXISTS jobaggregator;
USE jobaggregator;

CREATE TABLE IF NOT EXISTS companies_wld (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS jobs_wld (
    id VARCHAR(255) PRIMARY KEY,
    company_id VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    salary_min INT,
    salary_max INT,
    currency VARCHAR(10),
    contract_type VARCHAR(50),
    experience_years INT,
    remote_type VARCHAR(50),
    created_at TIMESTAMP,
    skills JSON, 
    FOREIGN KEY (company_id) REFERENCES companies_wld(id)
);


CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user','recruiter','admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies_dj (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS jobs_dj (
    id VARCHAR(255) PRIMARY KEY,
    company_id VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    salary_min INT,
    salary_max INT,
    currency VARCHAR(10),
    contract_type VARCHAR(50),
    experience_years INT,
    remote_type VARCHAR(50),
    created_at TIMESTAMP,
    skills JSON, 
    FOREIGN KEY (company_id) REFERENCES companies_dj(id)
);