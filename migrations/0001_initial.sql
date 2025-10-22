-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Farms table
CREATE TABLE farms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  location_state TEXT NOT NULL,
  location_district TEXT NOT NULL,
  location_village TEXT NOT NULL,
  coordinates_lat REAL,
  coordinates_lng REAL,
  size REAL NOT NULL,
  crop_types TEXT, -- JSON array
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Decisions table
CREATE TABLE decisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  farm_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('planting', 'irrigation', 'fertilizer', 'harvest')),
  recommendation TEXT NOT NULL,
  confidence REAL NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  factors TEXT, -- JSON array
  nasa_data TEXT, -- JSON object
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_farms_user_id ON farms(user_id);
CREATE INDEX idx_decisions_user_id ON decisions(user_id);
CREATE INDEX idx_decisions_farm_id ON decisions(farm_id);
CREATE INDEX idx_decisions_created_at ON decisions(created_at);