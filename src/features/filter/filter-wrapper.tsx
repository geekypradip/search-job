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
  const dispatch = useAppDispatch();
  const timerId = useRef<NodeJS.Timeout | null>(null);

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
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      dispatch(resetFilter());
    };
  }, []);
  return (
    <Stack direction={"row"} width={"90%"} gap={1} p={1} flexWrap={"wrap"}>
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
