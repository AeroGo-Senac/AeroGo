
-- Users Table
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Airports Table
CREATE TABLE airports (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Aircraft Models Table
CREATE TABLE aircraft (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  model VARCHAR(100) NOT NULL UNIQUE,
  economic_seats INT NOT NULL CHECK (economic_seats >= 0),
  premium_seats INT NOT NULL CHECK (premium_seats >= 0),
  executive_seats INT NOT NULL CHECK (executive_seats >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Flights Table
CREATE TABLE flights (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  flight_number VARCHAR(20) NOT NULL,
  origin_airport_id CHAR(36) NOT NULL,
  destination_airport_id CHAR(36) NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  arrival_date DATE NOT NULL,
  arrival_time TIME NOT NULL,
  aircraft_id CHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (flight_number, departure_date, departure_time),
  FOREIGN KEY (origin_airport_id) REFERENCES airports(id) ON DELETE CASCADE,
  FOREIGN KEY (destination_airport_id) REFERENCES airports(id) ON DELETE CASCADE,
  FOREIGN KEY (aircraft_id) REFERENCES aircraft(id) ON DELETE CASCADE
);

-- Seat Classes Table
CREATE TABLE seat_classes (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  flight_id CHAR(36) NOT NULL,
  type ENUM('economic', 'premium', 'executive') NOT NULL,
  available_seats INT NOT NULL CHECK (available_seats >= 0),
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (flight_id, type),
  FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE
);

-- Packages Table
CREATE TABLE packages (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  flight_id CHAR(36) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE
);

-- Bookings Table
CREATE TABLE bookings (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  flight_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  seat_class_type ENUM('economic', 'premium', 'executive') NOT NULL,
  seat_number VARCHAR(10),
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'confirmed', 'cancelled') NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Booking Packages (Junction table for booking and packages)
CREATE TABLE booking_packages (
  booking_id CHAR(36) NOT NULL,
  package_id CHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (booking_id, package_id),
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

-- Payments Table
CREATE TABLE payments (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  booking_id CHAR(36) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_method VARCHAR(50) NOT NULL,
  status ENUM('pending', 'completed', 'failed') NOT NULL,
  transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Adding indexes for performance
CREATE INDEX idx_flights_departure ON flights(departure_date, departure_time);
CREATE INDEX idx_bookings_flight_id ON bookings(flight_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
