DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  intensity INTEGER NOT NULL CHECK (intensity >= 1 AND intensity <= 10),
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (content, intensity, votes) VALUES 
('I do not work for free.', 1, 5),
('My rate is $150/hr.', 2, 2),
('Exposure is not legal tender.', 5, 10),
('No.', 8, 20),
('Read my lips: Pay me.', 10, 50);