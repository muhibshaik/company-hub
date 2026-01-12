export interface CompanyProfile {
  id: string;
  legalName: string;
  industry: string;
  companySize: string;
  foundedYear: number;
  website: string;
  businessType: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  fullAddress: string;
  hrContactName: string;
  hrEmail: string;
  hrPhone: string;
  department: string;
  benefits: string[];
  workCultureDescription: string;
  logoUrl: string;
  coverImageUrl: string;
  linkedinUrl: string;
  profileCompletion: number;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  status: 'Active' | 'Closed' | 'Draft';
  applicantCount: number;
  postedBy: string;
  postedDate: string;
  description?: string;
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  status: 'New' | 'Reviewing' | 'Shortlisted' | 'Rejected' | 'Hired';
  appliedDate: string;
  jobId: string;
  jobTitle: string;
  cvUrl?: string;
  phone?: string;
  experience?: string;
}

export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;
  newApplicants: number;
  profileCompletion: number;
}
