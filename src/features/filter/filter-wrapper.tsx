import { Autocomplete, Stack, TextField } from "@mui/material";
import { Children, useEffect, useRef } from "react";
import {
  IFilter,
  resetFilter,
  updateFilter,
} from "../../redux/reducer/filter-slicer";
import { useAppDispatch } from "../../redux/reducer/hooks";
import { filterData } from "./helper";

export const FilterWrapper = () => {
  //action dispatcher function
  const dispatch = useAppDispatch();
  //timer ref to store the timer id of the debounced timer
  const timerId = useRef<NodeJS.Timeout | null>(null);

  /**
   * @param data
   * @description handle filter change of the inputs and dispatch the action to the redux with debounced
   */
  const handleFilterChange = (data: {
    accessKey: keyof IFilter;
    value: string & string[];
  }) => {
    const { accessKey, value } = data;

    //debounce the filter change
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      dispatch(
        updateFilter({
          key: accessKey,
          value: value,
        })
      );
    }, 500);
  };

  useEffect(() => {
    //clear the timer and filter on unmount
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      dispatch(resetFilter());
    };
  }, []);

  //For the below inputs [autoComplete, textField] we are using the same function to handle the change, here can't use event delegation  because autoComplete  onChange is not bubbled to the parent
  return (
    <Stack
      direction={"row"}
      width={"90%"}
      gap={1}
      p={1}
      flexWrap={"wrap"}
      justifyContent={{ xs: "center", sm: "flex-start" }}
    >
      {Children.toArray(
        filterData.map((filter) => (
          <Autocomplete
            onChange={(_e, value) => {
              handleFilterChange({
                accessKey: filter.id as keyof IFilter,
                value: value as string & string[],
              });
            }}
            accessKey={filter.id}
            sx={{ minWidth: 220 }}
            size="small"
            options={filter.data}
            renderInput={(params) => (
              <TextField {...params} label={filter.label} />
            )}
            multiple={filter.multiple}
          />
        ))
      )}
      <TextField
        onChange={(e) => {
          handleFilterChange({
            accessKey: "companyName",
            value: e.target.value as string & string[],
          });
        }}
        label="Company"
        size="small"
        sx={{ minWidth: 220 }}
        accessKey="companyName"
      />
    </Stack>
  );
};
