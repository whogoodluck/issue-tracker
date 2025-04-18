import { z } from 'zod'

export function requiredString(fieldName: string) {
  return z
    .string()
    .trim()
    .min(1, { message: `${fieldName} is required` })
}
