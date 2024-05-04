import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface IJob {
  companyName: string;
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  maxExp: number;
  maxJdSalary: number;
  minExp: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
}

interface IJobStates {
  data: {
    jobs: IJob[];
    totalResults: number;
  };
  error: any;
  loading: boolean;
}

const initialState: IJobStates = {
  data: {
    jobs: [],
    totalResults: 0,
  },
  error: null,
  loading: false,
};

export const JobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action: PayloadAction<IJobStates["data"]>) => {
      state.loading = false;
      state.error = null;
      state.data.jobs.push(...(action?.payload?.jobs || []));
    },
    error: (state, action: PayloadAction<IJobStates["error"]>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { error, loading, success } = JobsSlice.actions;

export default JobsSlice.reducer;
