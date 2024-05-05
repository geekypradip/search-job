import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilter {
  location: string[];
  minExp: string | null;
  minSalary: string | null;
  jobRole: string[];
  companyName: string;
}

interface IFilterStates {
  filter: IFilter;
}
const initialState: IFilterStates = {
  filter: {
    companyName: "",
    jobRole: [],
    location: [],
    minExp: null,
    minSalary: null,
  },
};

export const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<IFilter>) => {
      state.filter = action.payload;
    },

    resetFilter: (state) => {
      state = initialState;
    },
  },
});

export const { updateFilter, resetFilter } = FilterSlice.actions;

export default FilterSlice.reducer;
