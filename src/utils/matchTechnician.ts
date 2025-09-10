import { JobRequirement, TechnicianProfile } from '../types';

export const matchTechnician = (
  technicians: TechnicianProfile[],
  job: JobRequirement
): TechnicianProfile | null => {
  const candidates = technicians.filter((tech) => {
    const hasSkills = job.requiredSkills.every((skill: string) =>
      tech.skills.includes(skill)
    );
    const isAvailable = tech.availability.some((slot: { start: string; end: string }) =>
      new Date(job.scheduledTime) >= new Date(slot.start) &&
      new Date(job.scheduledTime) <= new Date(slot.end)
    );
    return hasSkills && isAvailable;
  });

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => {
    const distA = Math.hypot(a.location.lat - job.location.lat, a.location.lng - job.location.lng);
    const distB = Math.hypot(b.location.lat - job.location.lat, b.location.lng - job.location.lng);
    return distA - distB;
  });

  return candidates[0];
};

