import { combineSlices } from "@reduxjs/toolkit";
import { store } from "../store.config";
import Jobs from "./jobs-slicer";
export const reducers = combineSlices({
  Jobs,
});
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
