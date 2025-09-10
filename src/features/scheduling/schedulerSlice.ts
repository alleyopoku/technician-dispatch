import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Removed React component and CSS import. Place these in your React component file.

interface Job {
  id: string;
  technicianId: string;
  scheduledTime: string;
}

interface SchedulerState {
  jobs: Job[];
}

const initialState: SchedulerState = {
  jobs: [],
};

const schedulerSlice = createSlice({
  name: 'scheduler',
  initialState,
  reducers: {
    addJob(state, action: PayloadAction<Job>) {
      state.jobs.push(action.payload);
    },
    removeJob(state, action: PayloadAction<string>) {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
  },
});

export const { addJob, removeJob } = schedulerSlice.actions;
export default schedulerSlice.reducer;

interface TechnicianAvailability {
  technicianId: string;
  availableSlots: {
    start: string; // ISO date string
    end: string;   // ISO date string
  }[];
}

export const technicianAvailability: TechnicianAvailability[] = [
  {
    technicianId: 'tech-001',
    availableSlots: [
      { start: '2025-09-11T08:00:00', end: '2025-09-11T12:00:00' },
      { start: '2025-09-11T14:00:00', end: '2025-09-11T18:00:00' },
    ],
  },
  // Add more technicians...
];

// Removed Calendar component usage. Place this JSX in your React component file.