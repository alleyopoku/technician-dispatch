export interface TechnicianAvailability {
  technicianId: string;
  availableSlots: {
    start: string; // ISO string
    end: string;
  }[];
}