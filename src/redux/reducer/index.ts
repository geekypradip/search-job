import { combineSlices } from "@reduxjs/toolkit";
import { store } from "../store.config";
import Filter from "./filter-slicer";
import Jobs from "./jobs-slicer";
export const reducers = combineSlices({
  Jobs,
  Filter,
});
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
