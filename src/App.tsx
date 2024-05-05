import { Box, Divider } from "@mui/material";
import { FilterWrapper } from "./features/filter";
import { JobsWrapper } from "./features/jobs";

function App() {
  return (
    <Box>
      <FilterWrapper />
      <Divider />
      <JobsWrapper />
    </Box>
  );
}

export default App;
