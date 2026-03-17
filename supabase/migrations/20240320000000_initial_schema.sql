-- =========================================================
-- AERODESK PLATFORM - INITIAL DATABASE SCHEMA
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================
-- USERS TABLE (extends Supabase auth.users)
-- =========================================================
CREATE TABLE public.users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT CHECK (role IN ('admin', 'operator', 'corporate', 'travel-agency', 'hotel', 'customer')) DEFAULT 'customer',
  status TEXT CHECK (status IN ('active', 'pending', 'suspended', 'blocked')) DEFAULT 'pending',
  company_name TEXT,
  phone_number TEXT,
  address TEXT,
  avatar TEXT,
  operator_id UUID,
  corporate_id UUID,
  agency_id UUID,
  hotel_partner_id UUID,
  firm_role TEXT,
  legal_entity_name TEXT,
  gstin TEXT,
  gst_verification_status TEXT CHECK (gst_verification_status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
  state_code TEXT,
  gst_registered_address TEXT,
  ctd_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- OPERATORS TABLE
-- =========================================================
CREATE TABLE public.operators (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  company_name TEXT NOT NULL,
  contact_person_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  nsop_license_number TEXT,
  city TEXT,
  zone TEXT CHECK (zone IN ('North', 'South', 'East', 'West', 'Central')),
  fleet_size INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('ACTIVE', 'PENDING_APPROVAL', 'SUSPENDED', 'BLOCKED')) DEFAULT 'PENDING_APPROVAL',
  gst_number TEXT,
  gst_verification_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- AIRCRAFT TABLE
-- =========================================================
CREATE TABLE public.aircraft (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  operator_id UUID REFERENCES public.operators(id) ON DELETE CASCADE,
  registration TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  model TEXT,
  manufacturer TEXT,
  year INTEGER,
  capacity INTEGER NOT NULL,
  range INTEGER,
  cruise_speed INTEGER,
  amenities TEXT[],
  baggage_capacity INTEGER,
  home_base TEXT,
  hourly_rate DECIMAL(10,2),
  status TEXT CHECK (status IN ('AVAILABLE', 'IN_CHARTER', 'MAINTENANCE', 'MAINTENANCE_DUE', 'AOG')) DEFAULT 'AVAILABLE',
  last_maintenance DATE,
  next_maintenance DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- CREW TABLE
-- =========================================================
CREATE TABLE public.crew (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  operator_id UUID REFERENCES public.operators(id) ON DELETE CASCADE,
  aircraft_id UUID REFERENCES public.aircraft(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('PILOT', 'CO_PILOT', 'FLIGHT_ATTENDANT', 'ENGINEER', 'GROUND_STAFF')),
  status TEXT CHECK (status IN ('AVAILABLE', 'ON_DUTY', 'OFF_DUTY', 'ON_LEAVE', 'TRAINING')) DEFAULT 'AVAILABLE',
  license_number TEXT,
  license_expiry DATE,
  medical_expiry DATE,
  total_flight_hours INTEGER,
  certifications TEXT[],
  base_airport TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- CHARTER RFQS TABLE
-- =========================================================
CREATE TABLE public.charter_rfqs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  request_id TEXT UNIQUE,
  customer_id UUID REFERENCES public.users(id),
  operator_id UUID REFERENCES public.operators(id),
  agency_id UUID REFERENCES public.users(id),
  corporate_id UUID REFERENCES public.users(id),
  customer_name TEXT,
  company TEXT,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  return_date DATE,
  return_time TIME,
  pax INTEGER NOT NULL,
  aircraft_type TEXT NOT NULL,
  status TEXT CHECK (status IN ('Draft', 'New', 'Submitted', 'Bidding Open', 'quoteAccepted', 'confirmed', 'completed', 'cancelled')) DEFAULT 'Draft',
  cost_center TEXT,
  business_purpose TEXT,
  hotel_required BOOLEAN DEFAULT FALSE,
  hotel_preferences TEXT,
  catering TEXT,
  special_requirements TEXT,
  total_amount DECIMAL(10,2),
  bids_count INTEGER DEFAULT 0,
  selected_quote_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expiry_date TIMESTAMP WITH TIME ZONE
);

-- =========================================================
-- CHARTER QUOTES TABLE
-- =========================================================
CREATE TABLE public.charter_quotes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  rfq_id UUID REFERENCES public.charter_rfqs(id) ON DELETE CASCADE,
  operator_id UUID REFERENCES public.operators(id),
  aircraft_id UUID REFERENCES public.aircraft(id),
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  valid_until DATE NOT NULL,
  terms TEXT,
  is_selected BOOLEAN DEFAULT FALSE,
  breakdown JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- EMPTY LEGS TABLE
-- =========================================================
CREATE TABLE public.empty_legs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  operator_id UUID REFERENCES public.operators(id),
  aircraft_id UUID REFERENCES public.aircraft(id),
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
  arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
  total_seats INTEGER NOT NULL,
  available_seats INTEGER NOT NULL,
  price_per_seat DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT CHECK (status IN ('draft', 'published', 'approved', 'expired', 'cancelled')) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- =========================================================
-- SEAT BOOKINGS TABLE
-- =========================================================
CREATE TABLE public.seat_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_reference TEXT UNIQUE,
  empty_leg_id UUID REFERENCES public.empty_legs(id),
  user_id UUID REFERENCES public.users(id),
  booker_type TEXT,
  seats_booked INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  passengers JSONB NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'refunded')) DEFAULT 'pending',
  invoice_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- HOTELS TABLE
-- =========================================================
CREATE TABLE public.hotels (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  name TEXT NOT NULL,
  chain TEXT,
  city TEXT NOT NULL,
  address TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  email TEXT,
  phone TEXT,
  amenities TEXT[],
  room_types TEXT[],
  status TEXT CHECK (status IN ('ACTIVE', 'INACTIVE', 'MAINTENANCE')) DEFAULT 'ACTIVE',
  partner_since TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- HOTEL PROPERTIES TABLE
-- =========================================================
CREATE TABLE public.hotel_properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  pincode TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  amenities TEXT[],
  total_rooms INTEGER,
  status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- ROOM INVENTORY TABLE
-- =========================================================
CREATE TABLE public.room_inventory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.hotel_properties(id) ON DELETE CASCADE,
  room_type TEXT NOT NULL,
  room_number TEXT,
  floor INTEGER,
  capacity INTEGER,
  base_rate DECIMAL(10,2),
  currency TEXT DEFAULT 'INR',
  amenities TEXT[],
  status TEXT CHECK (status IN ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'BLOCKED')) DEFAULT 'AVAILABLE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- HOTEL BOOKINGS TABLE
-- =========================================================
CREATE TABLE public.hotel_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_reference TEXT UNIQUE,
  property_id UUID REFERENCES public.hotel_properties(id),
  room_id UUID REFERENCES public.room_inventory(id),
  charter_id TEXT,
  user_id UUID REFERENCES public.users(id),
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guest_phone TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  adults INTEGER,
  children INTEGER DEFAULT 0,
  total_amount DECIMAL(10,2),
  currency TEXT DEFAULT 'INR',
  status TEXT CHECK (status IN ('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED')) DEFAULT 'PENDING',
  payment_status TEXT DEFAULT 'PENDING',
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- CORPORATE ORGANIZATIONS TABLE
-- =========================================================
CREATE TABLE public.corporate_organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT NOT NULL,
  industry TEXT,
  contact_email TEXT,
  annual_budget DECIMAL(15,2),
  used_budget DECIMAL(15,2) DEFAULT 0,
  currency TEXT DEFAULT 'INR',
  status TEXT CHECK (status IN ('ACTIVE', 'PENDING_SETUP', 'SUSPENDED', 'BLOCKED')) DEFAULT 'PENDING_SETUP',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- COST CENTERS TABLE
-- =========================================================
CREATE TABLE public.cost_centers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  corporate_id UUID REFERENCES public.corporate_organizations(id),
  cost_center_id TEXT NOT NULL,
  department_name TEXT NOT NULL,
  allocated_budget DECIMAL(15,2),
  used_budget DECIMAL(15,2) DEFAULT 0,
  manager_id UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- TRAVEL REQUESTS TABLE
-- =========================================================
CREATE TABLE public.travel_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  request_number TEXT UNIQUE,
  corporate_id UUID REFERENCES public.corporate_organizations(id),
  employee_id UUID REFERENCES public.users(id),
  employee_name TEXT,
  department TEXT,
  travel_type TEXT CHECK (travel_type IN ('CHARTER', 'JET_SEATS', 'HOTEL')),
  origin TEXT,
  destination TEXT,
  departure_date DATE,
  return_date DATE,
  passenger_count INTEGER,
  purpose_of_travel TEXT,
  cost_center_id UUID REFERENCES public.cost_centers(id),
  estimated_budget DECIMAL(15,2),
  actual_cost DECIMAL(15,2),
  request_status TEXT CHECK (request_status IN ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED')) DEFAULT 'PENDING',
  approval_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- INVOICES TABLE
-- =========================================================
CREATE TABLE public.invoices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invoice_number TEXT UNIQUE,
  invoice_type TEXT CHECK (invoice_type IN ('charter', 'seat', 'hotel', 'subscription')),
  issuer_id UUID,
  issuer_type TEXT,
  recipient_id UUID,
  recipient_type TEXT,
  subtotal DECIMAL(15,2),
  tax DECIMAL(15,2),
  total DECIMAL(15,2),
  currency TEXT DEFAULT 'INR',
  status TEXT CHECK (status IN ('draft', 'issued', 'paid', 'overdue', 'cancelled')) DEFAULT 'draft',
  due_date DATE,
  paid_at TIMESTAMP WITH TIME ZONE,
  items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- PAYMENTS TABLE
-- =========================================================
CREATE TABLE public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  payment_reference TEXT UNIQUE,
  invoice_id UUID REFERENCES public.invoices(id),
  amount DECIMAL(15,2),
  method TEXT CHECK (method IN ('bank_transfer', 'card', 'upi', 'wallet')),
  transaction_id TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  initiated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB
);

-- =========================================================
-- AUDIT LOGS TABLE
-- =========================================================
CREATE TABLE public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES public.users(id),
  user_email TEXT,
  user_role TEXT,
  action TEXT,
  entity_type TEXT,
  entity_id TEXT,
  changes JSONB,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB
);

-- =========================================================
-- NOTIFICATIONS TABLE
-- =========================================================
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  type TEXT,
  priority TEXT CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
  title TEXT,
  message TEXT,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- =========================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =========================================================
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_aircraft_operator ON public.aircraft(operator_id);
CREATE INDEX idx_empty_legs_departure ON public.empty_legs(departure_time);
CREATE INDEX idx_empty_legs_route ON public.empty_legs(origin, destination);
CREATE INDEX idx_charter_rfqs_customer ON public.charter_rfqs(customer_id);
CREATE INDEX idx_charter_rfqs_status ON public.charter_rfqs(status);
CREATE INDEX idx_seat_bookings_user ON public.seat_bookings(user_id);
CREATE INDEX idx_hotel_bookings_dates ON public.hotel_bookings(check_in, check_out);
CREATE INDEX idx_travel_requests_employee ON public.travel_requests(employee_id);
CREATE INDEX idx_travel_requests_status ON public.travel_requests(request_status);
CREATE INDEX idx_audit_logs_timestamp ON public.audit_logs(timestamp DESC);
CREATE INDEX idx_notifications_user_read ON public.notifications(user_id, read);

-- =========================================================
-- ENABLE ROW LEVEL SECURITY
-- =========================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aircraft ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crew ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charter_rfqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charter_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.empty_legs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seat_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corporate_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- =========================================================
-- CREATE BASIC RLS POLICIES
-- =========================================================

-- Users: Users can read/update their own data
CREATE POLICY users_self_access ON public.users
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Operators: Operators can access their own data
CREATE POLICY operators_self_access ON public.operators
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Aircraft: Operators can manage their aircraft
CREATE POLICY aircraft_operator_access ON public.aircraft
  USING (operator_id IN (SELECT id FROM public.operators WHERE user_id = auth.uid()));

-- Empty Legs: Public read for published, operator write
CREATE POLICY empty_legs_public_read ON public.empty_legs
  FOR SELECT USING (status = 'published');

CREATE POLICY empty_legs_operator_write ON public.empty_legs
  USING (operator_id IN (SELECT id FROM public.operators WHERE user_id = auth.uid()));

-- =========================================================
-- CREATE FUNCTIONS AND TRIGGERS
-- =========================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update_updated_at to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_operators_updated_at BEFORE UPDATE ON public.operators
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_aircraft_updated_at BEFORE UPDATE ON public.aircraft
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate booking reference
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
  NEW.booking_reference = 'BK' || TO_CHAR(NOW(), 'YYMM') || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER generate_seat_booking_ref BEFORE INSERT ON public.seat_bookings
  FOR EACH ROW EXECUTE FUNCTION generate_booking_reference();

CREATE TRIGGER generate_hotel_booking_ref BEFORE INSERT ON public.hotel_bookings
  FOR EACH ROW EXECUTE FUNCTION generate_booking_reference();