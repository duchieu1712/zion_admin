import MenuItem from "@mui/material/MenuItem";
import { ReactNode } from "react";
import TextField from "@mui/material/TextField";

// ----------------------------------------------------------------------

// PostSort.propTypes = {
//   options: PropTypes.array,
//   onSort: PropTypes.func,
// };

export default function PostSort({
  options,
  onSort,
}: {
  options: { value: any; label: ReactNode }[];
  onSort?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
}) {
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
