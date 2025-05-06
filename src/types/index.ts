type UUID = string;

type User = {
  id: UUID;
  email: string;
  name: string;
  password_hash: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
};

type Airport = {
  id: UUID;
  code: string;
  name: string;
  city: string;
  country: string;
  created_at: Date;
  updated_at: Date;
};

type Aircraft = {
  id: UUID;
  model: string;
  economic_seats: number;
  premium_seats: number;
  executive_seats: number;
  created_at: Date;
  updated_at: Date;
};



type SeatClassType = 'economic' | 'premium' | 'executive';

type SeatClass = {
  id: UUID;
  flight_id: UUID;
  type: SeatClassType;
  available_seats: number;
  price: number;
  created_at: Date;
  updated_at: Date;
};

type Package = {
  id: UUID;
  flight_id: UUID;
  name: string;
  description?: string;
  price: number;
  created_at: Date;
  updated_at: Date;
};

type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

type Booking = {
  id: UUID;
  flight_id: UUID;
  user_id: UUID;
  seat_class_type: SeatClassType;
  seat_number?: string;
  booking_date: Date;
  status: BookingStatus;
  total_price: number;
  created_at: Date;
  updated_at: Date;
};

type BookingPackage = {
  booking_id: UUID;
  package_id: UUID;
  created_at: Date;
};

type PaymentStatus = 'pending' | 'completed' | 'failed';

type Payment = {
  id: UUID;
  booking_id: UUID;
  amount: number;
  payment_date: Date;
  payment_method: string;
  status: PaymentStatus;
  transaction_id?: string;
  created_at: Date;
  updated_at: Date;
};


type Flight = {
  id: UUID;
  flight_number: string;
  origin_airport_id: UUID;
  destination_airport_id: UUID;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  aircraft_id: UUID;
  created_at: Date;
  updated_at: Date;
};

interface FlightComplete extends Flight {
  origin_airport: Airport[];
  destination_airport: Airport[];
  aircraft: Aircraft[];
  seat_classes: SeatClass[];
  packages: Package[];
}

export type { Payment, BookingPackage, Booking, Package, SeatClass, Flight, Aircraft, Airport, User, SeatClassType, FlightComplete, BookingStatus, PaymentStatus };