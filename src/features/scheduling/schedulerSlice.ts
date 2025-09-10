import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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