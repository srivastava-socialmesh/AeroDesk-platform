-- =========================================================
-- SEED DATA FOR DEVELOPMENT
-- =========================================================

-- Insert test users (these would normally be created through auth)
-- Note: In production, users are created through auth.signUp()

-- Insert test operators
INSERT INTO public.operators (id, user_id, company_name, contact_email, contact_phone, nsop_license_number, city, zone, fleet_size, status, gst_number, created_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', NULL, 'Delta Air Charter', 'ops@deltaair.com', '+91 98765 43210', 'NSOP-2024-001', 'Mumbai', 'West', 12, 'ACTIVE', '27AAECS1234F1Z5', NOW()),
  ('22222222-2222-2222-2222-222222222222', NULL, 'India Jet Charter', 'charter@indiajet.com', '+91 98765 43211', 'NSOP-2024-002', 'Delhi', 'North', 8, 'ACTIVE', '07AABCI9012L1Z3', NOW()),
  ('33333333-3333-3333-3333-333333333333', NULL, 'Bombardier Executive', 'sales@bombardierexec.com', '+91 98765 43212', 'NSOP-2024-003', 'Bangalore', 'South', 5, 'PENDING_APPROVAL', '29AAHPM5678K1Z2', NOW());

-- Insert test aircraft
INSERT INTO public.aircraft (operator_id, registration, type, model, capacity, home_base, status, hourly_rate)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'VT-JSD', 'Challenger 850', 'Bombardier', 12, 'Mumbai', 'AVAILABLE', 85000),
  ('11111111-1111-1111-1111-111111111111', 'VT-JSE', 'Gulfstream G650', 'Gulfstream', 16, 'Mumbai', 'IN_CHARTER', 120000),
  ('11111111-1111-1111-1111-111111111111', 'VT-JSF', 'Cessna Citation', 'Cessna', 8, 'Mumbai', 'MAINTENANCE', 45000),
  ('22222222-2222-2222-2222-222222222222', 'VT-JSG', 'Bombardier Global', 'Bombardier', 14, 'Delhi', 'AVAILABLE', 95000),
  ('22222222-2222-2222-2222-222222222222', 'VT-JSH', 'Embraer Phenom', 'Embraer', 10, 'Delhi', 'AVAILABLE', 65000);

-- Insert test empty legs
INSERT INTO public.empty_legs (operator_id, aircraft_id, origin, destination, departure_time, arrival_time, total_seats, available_seats, price_per_seat, status)
VALUES 
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM public.aircraft WHERE registration = 'VT-JSD'), 'Mumbai (BOM)', 'Delhi (DEL)', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days 2.5 hours', 12, 8, 45000, 'published'),
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM public.aircraft WHERE registration = 'VT-JSE'), 'Delhi (DEL)', 'Bangalore (BLR)', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days 3 hours', 16, 10, 52000, 'published'),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM public.aircraft WHERE registration = 'VT-JSG'), 'Bangalore (BLR)', 'Chennai (MAA)', NOW() + INTERVAL '4 days', NOW() + INTERVAL '4 days 1.5 hours', 14, 6, 38000, 'published');

-- Insert test charter RFQs
INSERT INTO public.charter_rfqs (customer_id, origin, destination, departure_date, departure_time, pax, aircraft_type, status, hotel_required, created_at)
VALUES 
  (NULL, 'Mumbai', 'Delhi', CURRENT_DATE + 7, '10:00', 8, 'Heavy Jet', 'Bidding Open', TRUE, NOW()),
  (NULL, 'Delhi', 'Bangalore', CURRENT_DATE + 10, '09:00', 4, 'Light Jet', 'New', FALSE, NOW()),
  (NULL, 'Mumbai', 'Goa', CURRENT_DATE + 14, '08:30', 6, 'Mid-size Jet', 'Bidding Open', TRUE, NOW());

-- Insert test hotels
INSERT INTO public.hotels (name, chain, city, amenities, status)
VALUES 
  ('Taj Mahal Palace', 'Taj', 'Mumbai', ARRAY['Pool', 'Spa', 'Restaurant', 'Gym'], 'ACTIVE'),
  ('The Oberoi', 'Oberoi', 'Delhi', ARRAY['Pool', 'Spa', 'Restaurant', 'Business Center'], 'ACTIVE'),
  ('ITC Gardenia', 'ITC', 'Bangalore', ARRAY['Pool', 'Spa', 'Restaurant', 'Gym'], 'ACTIVE');

-- Insert test hotel properties
INSERT INTO public.hotel_properties (hotel_id, name, address, city, total_rooms)
SELECT id, name, 'Test Address', city, 200 FROM public.hotels;

-- Insert test room inventory
INSERT INTO public.room_inventory (property_id, room_type, capacity, base_rate, status)
SELECT 
  id,
  'Deluxe Suite',
  2,
  15000,
  'AVAILABLE'
FROM public.hotel_properties;

-- Insert test corporate organization
INSERT INTO public.corporate_organizations (company_name, industry, contact_email, annual_budget, used_budget, status)
VALUES ('Reliance Industries', 'Conglomerate', 'travel@ril.com', 50000000, 12500000, 'ACTIVE');

INSERT INTO public.cost_centers (corporate_id, cost_center_id, department_name, allocated_budget, used_budget)
VALUES 
  ((SELECT id FROM public.corporate_organizations LIMIT 1), 'CC-SALES-001', 'Sales Department', 15000000, 8200000),
  ((SELECT id FROM public.corporate_organizations LIMIT 1), 'CC-EXEC-001', 'Executive Team', 20000000, 14500000),
  ((SELECT id FROM public.corporate_organizations LIMIT 1), 'CC-OPS-001', 'Operations', 15000000, 9800000);

-- Insert test travel requests
INSERT INTO public.travel_requests (corporate_id, employee_name, department, travel_type, origin, destination, departure_date, passenger_count, purpose_of_travel, cost_center_id, estimated_budget, request_status)
VALUES 
  ((SELECT id FROM public.corporate_organizations LIMIT 1), 'Rahul Sharma', 'Sales', 'CHARTER', 'Mumbai', 'Delhi', CURRENT_DATE + 7, 2, 'Client Meeting', (SELECT id FROM public.cost_centers WHERE cost_center_id = 'CC-SALES-001'), 45000, 'PENDING'),
  ((SELECT id FROM public.corporate_organizations LIMIT 1), 'Priya Patel', 'Finance', 'JET_SEATS', 'Delhi', 'Bangalore', CURRENT_DATE + 10, 1, 'Audit', (SELECT id FROM public.cost_centers WHERE cost_center_id = 'CC-OPS-001'), 38000, 'PENDING');

-- Insert test notifications
INSERT INTO public.notifications (user_id, type, priority, title, message, read)
VALUES 
  (NULL, 'RFQ_CREATED', 'MEDIUM', 'New Charter RFQ', 'A new charter request has been created from Mumbai to Delhi', FALSE),
  (NULL, 'SEAT_REQUEST', 'HIGH', 'Seat Booking Request', 'New seat booking request for Mumbai-Delhi flight', FALSE);

-- Insert test audit log
INSERT INTO public.audit_logs (user_id, action, entity_type, entity_id, metadata)
VALUES (NULL, 'SYSTEM_START', 'SYSTEM', 'INIT', '{"version": "1.0.0"}');