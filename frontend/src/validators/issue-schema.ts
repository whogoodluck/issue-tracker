import { z } from 'zod'

import { requiredString } from './helper'

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export const issueFormSchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  status: z.nativeEnum(Status),
  priority: z.nativeEnum(Priority)
})

export type IssueFormSchema = z.infer<typeof issueFormSchema>
