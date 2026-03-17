import * as z from 'zod'

export const charterRFQSchema = z.object({
  origin: z.string().min(3, 'Origin is required'),
  destination: z.string().min(3, 'Destination is required'),
  departureDate: z.string().min(1, 'Departure date is required'),
  departureTime: z.string().min(1, 'Departure time is required'),
  returnDate: z.string().optional(),
  returnTime: z.string().optional(),
  passengers: z.number().min(1, 'At least 1 passenger required').max(20, 'Maximum 20 passengers'),
  aircraftType: z.string().min(1, 'Aircraft type is required'),
  catering: z.string().optional(),
  specialRequirements: z.string().optional(),
  hotelRequired: z.boolean().default(false),
  hotelPreferences: z.string().optional(),
  costCenter: z.string().optional(),
  businessPurpose: z.string().optional(),
})

export const charterQuoteSchema = z.object({
  rfqId: z.string().min(1, 'RFQ ID is required'),
  aircraftId: z.string().min(1, 'Aircraft is required'),
  totalAmount: z.number().min(1, 'Amount is required'),
  currency: z.enum(['INR', 'USD']).default('INR'),
  validUntil: z.string().min(1, 'Validity date is required'),
  terms: z.string().optional(),
  breakdown: z.object({
    basePrice: z.number(),
    fuelCharge: z.number(),
    handlingFee: z.number(),
    pilotFee: z.number(),
    otherCharges: z.number().optional(),
  }).optional(),
})

export const seatBookingSchema = z.object({
  emptyLegId: z.string().min(1, 'Flight is required'),
  seatsRequested: z.number().min(1, 'At least 1 seat required'),
  passengers: z.array(z.object({
    fullName: z.string().min(1, 'Name is required'),
    nationality: z.string().min(1, 'Nationality is required'),
    idType: z.enum(['passport', 'driving_license', 'aadhar']),
    idNumber: z.string().min(1, 'ID number is required'),
    dob: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
  })).min(1, 'At least one passenger required'),
})

export const hotelBookingSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  roomType: z.string().min(1, 'Room type is required'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  rooms: z.number().min(1, 'At least 1 room required'),
  adults: z.number().min(1, 'At least 1 adult required'),
  children: z.number().default(0),
  specialRequests: z.string().optional(),
})

export const corporateTravelRequestSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  travelType: z.enum(['CHARTER', 'JET_SEATS', 'HOTEL']),
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  departureDate: z.string().min(1, 'Departure date is required'),
  returnDate: z.string().optional(),
  passengerCount: z.number().min(1, 'At least 1 passenger'),
  purposeOfTravel: z.string().min(1, 'Purpose is required'),
  costCenterId: z.string().min(1, 'Cost center is required'),
  estimatedBudget: z.number().min(1, 'Budget estimate is required'),
})