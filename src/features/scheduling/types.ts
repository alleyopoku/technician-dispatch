// Technician Profile and Job Requirement Types

export interface TechnicianProfile {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  skills: string[];
  availability: {
    start: string; // ISO
    end: string;
  }[];
}

export interface JobRequirement {
  id: string;
  title: string;
  location: { lat: number; lng: number };
  requiredSkills: string[];
  scheduledTime: string;
}

