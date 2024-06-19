CREATE TABLE Files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255),
    size INT,
    content BLOB,
    grade_percentage DECIMAL(5, 2) 
);