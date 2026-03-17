// ============================================
// PLATFORM CONSTANTS
// ============================================

export const APP_NAME = 'AeroDesk'
export const APP_DESCRIPTION = 'Organized Charter Platform'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// ============================================
// USER ROLES
// ============================================

export const USER_ROLES = {
  ADMIN: 'admin',
  OPERATOR: 'operator',
  CORPORATE: 'corporate',
  TRAVEL_AGENCY: 'travel-agency',
  HOTEL: 'hotel',
  CUSTOMER: 'customer',
} as const

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.OPERATOR]: 'Aircraft Operator',
  [USER_ROLES.CORPORATE]: 'Corporate Travel Desk',
  [USER_ROLES.TRAVEL_AGENCY]: 'Travel Agency',
  [USER_ROLES.HOTEL]: 'Hotel Partner',
  [USER_ROLES.CUSTOMER]: 'Customer',
} as const

// ============================================
// CHARTER STATUS
// ============================================

export const CHARTER_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  BIDDING_OPEN: 'bidding_open',
  QUOTE_RECEIVED: 'quote_received',
  QUOTE_ACCEPTED: 'quote_accepted',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const CHARTER_STATUS_LABELS = {
  [CHARTER_STATUS.DRAFT]: 'Draft',
  [CHARTER_STATUS.SUBMITTED]: 'Submitted',
  [CHARTER_STATUS.BIDDING_OPEN]: 'Bidding Open',
  [CHARTER_STATUS.QUOTE_RECEIVED]: 'Quote Received',
  [CHARTER_STATUS.QUOTE_ACCEPTED]: 'Quote Accepted',
  [CHARTER_STATUS.CONFIRMED]: 'Confirmed',
  [CHARTER_STATUS.IN_PROGRESS]: 'In Progress',
  [CHARTER_STATUS.COMPLETED]: 'Completed',
  [CHARTER_STATUS.CANCELLED]: 'Cancelled',
} as const

// ============================================
// SEAT BOOKING STATUS
// ============================================

export const SEAT_BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const

// ============================================
// PAYMENT STATUS
// ============================================

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const

// ============================================
// AIRCRAFT TYPES
// ============================================

export const AIRCRAFT_TYPES = [
  { value: 'light_jet', label: 'Light Jet', capacity: '4-8 pax' },
  { value: 'midsize_jet', label: 'Mid-size Jet', capacity: '8-10 pax' },
  { value: 'super_midsize', label: 'Super Mid-size Jet', capacity: '8-12 pax' },
  { value: 'heavy_jet', label: 'Heavy Jet', capacity: '12-16 pax' },
  { value: 'ultra_long_range', label: 'Ultra Long Range', capacity: '14-19 pax' },
  { value: 'turboprop', label: 'Turboprop', capacity: '4-8 pax' },
] as const

// ============================================
// HOTEL ROOM TYPES
// ============================================

export const ROOM_TYPES = [
  { value: 'standard', label: 'Standard Room' },
  { value: 'deluxe', label: 'Deluxe Room' },
  { value: 'executive', label: 'Executive Suite' },
  { value: 'presidential', label: 'Presidential Suite' },
] as const

// ============================================
// INDIAN CITIES (Major Aviation Hubs)
// ============================================

export const INDIAN_CITIES = [
  { code: 'BOM', name: 'Mumbai', airport: 'Chhatrapati Shivaji Maharaj International Airport' },
  { code: 'DEL', name: 'Delhi', airport: 'Indira Gandhi International Airport' },
  { code: 'BLR', name: 'Bangalore', airport: 'Kempegowda International Airport' },
  { code: 'MAA', name: 'Chennai', airport: 'Chennai International Airport' },
  { code: 'CCU', name: 'Kolkata', airport: 'Netaji Subhas Chandra Bose International Airport' },
  { code: 'HYD', name: 'Hyderabad', airport: 'Rajiv Gandhi International Airport' },
  { code: 'PNQ', name: 'Pune', airport: 'Pune International Airport' },
  { code: 'AMD', name: 'Ahmedabad', airport: 'Sardar Vallabhbhai Patel International Airport' },
  { code: 'GOI', name: 'Goa', airport: 'Dabolim Airport' },
  { code: 'JAI', name: 'Jaipur', airport: 'Jaipur International Airport' },
] as const

// ============================================
// GST RATES
// ============================================

export const GST_RATES = {
  CHARTER: 18,
  SEAT_BOOKING: 5,
  HOTEL: 12,
  SUBSCRIPTION: 18,
} as const

// ============================================
// DATE FORMATS
// ============================================

export const DATE_FORMATS = {
  DISPLAY: 'dd MMM yyyy',
  DISPLAY_WITH_TIME: 'dd MMM yyyy, hh:mm a',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const

// ============================================
// CURRENCY
// ============================================

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
} as const

export const DEFAULT_CURRENCY = CURRENCIES.INR

// ============================================
// PAGINATION
// ============================================

export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

// ============================================
// FILE UPLOAD
// ============================================

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const

// ============================================
// API ENDPOINTS
// ============================================

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    SESSION: '/api/auth/session',
  },
  CHARTER: {
    BASE: '/api/charter',
    RFQ: '/api/charter/rfq',
    QUOTES: '/api/charter/quotes',
  },
  SEATS: {
    BASE: '/api/seats',
    BOOKINGS: '/api/seats/bookings',
  },
  HOTELS: {
    BASE: '/api/hotels',
    BOOKINGS: '/api/hotels/bookings',
  },
  CORPORATE: {
    REQUESTS: '/api/corporate/requests',
    APPROVALS: '/api/corporate/approvals',
    BUDGETS: '/api/corporate/budgets',
  },
} as const