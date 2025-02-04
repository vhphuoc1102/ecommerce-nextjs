import {object, string} from 'zod'

export const SignUpSchema = object({
  email: string({required_error: 'Email is required'})
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
  password: string({required_error: 'Password is required'})
      .min(1, 'Password is required')
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters")
      .refine((value) => {
        const errors = [];
        if (!/[A-Z]/.test(value)) errors.push('at least one uppercase letter');
        if (!/[a-z]/.test(value)) errors.push('at least one lowercase letter');
        if (!/[0-9]/.test(value)) errors.push('at least one number');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors.push('at least one special character');
        return errors.length === 0 || `Password must contain ${errors.join(', ')}`;
      }, {
        message: 'Password does not meet the requirements',
      }),
  verifyPassword: string({required_error: 'Verify Password is required'})
      .min(1, 'Verify Password is required')
}).refine((data) => data.password === data.verifyPassword, {
  message: "Passwords don't match",
  path: ["verifyPassword"],
});

export const ProductInfoSchema = object({});

export type FormState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string
} | undefined
