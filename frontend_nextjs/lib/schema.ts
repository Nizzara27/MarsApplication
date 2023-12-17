import { z } from 'zod'

export const FormDataSchema = z.object({
  //Personal Information
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  birthdate: z
    .string()
    .min(8, 'Date of birth is required')
    .regex(new RegExp(''))
    .transform((value) => new Date(value)),
  nationality: z.string().min(1, 'Nationality is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phoneNumber: z
    .string()
    .trim()
    .min(10,'Phone Number is required' )
    .regex(new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')),

  //Travel Preferences
  depDate: z
    .string()
    .min(8, 'Date of departure is required')
    .regex(new RegExp(''))
    .transform((value) => new Date(value)),
  retDate: z
    .string()
    .min(8, 'Date of return is required')
    .regex(new RegExp(''))
    .transform((value) => new Date(value)),
  accPre: z.enum(["Space Hotel","Martin Base"]).optional(),
  specialReq: z.string().optional(),

  //Health and Safety
  healthDec: z.string().min(3, "Must be yes").regex(new RegExp('Yes')),
  emergencyEmail: z.string().min(1, 'Emergency Email is required').email('Invalid email address'),
  emergencyPhoneNumber: z
  .string()
  .trim()
  .min(10,'Emergency Phone Number is required' )
  .regex(new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')),
  medConditions: z.string().optional()
  
})