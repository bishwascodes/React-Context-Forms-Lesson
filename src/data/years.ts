
export const yearsOfStudy = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior"
] as const;

export type YearOfStudy = typeof yearsOfStudy[number];
