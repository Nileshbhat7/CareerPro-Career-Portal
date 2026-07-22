export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  experience: string; // e.g. "2-4 Years", "Fresher"
  type: string;       // e.g. "Full Time", "Part Time"
  workplace: string;  // e.g. "Remote", "Hybrid", "Office"
  salary?: string;    // e.g. "8-12 LPA"
  postedDate: string; // e.g. "2026-07-20"
  skills: string[];
  description: string;
  responsibilities: string[];
  benefits: string[];
  companyInfo: string;
}

export interface JobApplication {
  jobId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  experience: number; // in years
  currentCompany?: string;
  currentCtc?: string;
  expectedCtc: string;
  noticePeriod: string;
  resumeName: string;
  resumeContent?: string; // base64 or file preview
  coverLetter?: string;
}
