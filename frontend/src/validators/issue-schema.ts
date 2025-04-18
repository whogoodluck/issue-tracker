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
  title: requiredString('Title').default(''),
  description: requiredString('Description').default(''),
  status: z.nativeEnum(Status).default(Status.OPEN),
  priority: z.nativeEnum(Priority).default(Priority.MEDIUM)
})

export type IssueFormSchema = z.infer<typeof issueFormSchema>
