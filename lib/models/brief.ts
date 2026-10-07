import { z } from 'zod'
import type { ObjectId } from 'mongodb'

/** Briefs — enquiries submitted through the public /contact form. */

export const BRIEF_STATUSES = ['new', 'read', 'archived'] as const
export type BriefStatus = (typeof BRIEF_STATUSES)[number]

/** What the public form may submit. `website` is a honeypot: hidden from
 *  people, so any value means a bot filled it in. */
export const BriefInputSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  company: z.string().trim().max(160).default(''),
  email: z.string().trim().email('Enter a valid email').max(160),
  practiceArea: z.string().trim().min(1, 'Choose a practice area').max(160),
  message: z.string().trim().min(1, 'Tell us about the matter').max(5000),
  website: z.string().max(200).optional(),
})
export type BriefInput = z.infer<typeof BriefInputSchema>

export const BriefStatusUpdateSchema = z.object({
  status: z.enum(BRIEF_STATUSES),
})

export type BriefDoc = {
  _id?: ObjectId
  name: string
  company: string
  email: string
  practiceArea: string
  message: string
  status: BriefStatus
  /** Hash of the submitter's IP — used only for rate limiting. */
  ipHash: string
  userAgent: string
  createdAt: Date
  updatedAt: Date
}

export type BriefListItem = {
  _id: string
  name: string
  company: string
  email: string
  practiceArea: string
  message: string
  status: BriefStatus
  createdAt: string
}

export function toBriefListItem(doc: BriefDoc): BriefListItem {
  return {
    _id: String(doc._id),
    name: doc.name,
    company: doc.company ?? '',
    email: doc.email,
    practiceArea: doc.practiceArea ?? '',
    message: doc.message ?? '',
    status: BRIEF_STATUSES.includes(doc.status) ? doc.status : 'new',
    createdAt: (doc.createdAt instanceof Date ? doc.createdAt : new Date()).toISOString(),
  }
}
