export const courses = ['Web Development', 'Database Fundamentals', 'UX Design', 'Software Engineering'] as const
import type { YearOfStudy } from "./years";

export type Course = (typeof courses)[number]

export type Registration = {
  id: string
  name: string
  email: string
  course: Course
  yearOfStudy: YearOfStudy
}

