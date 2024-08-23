import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";

import Iconify from "../../components/iconify/iconify";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

// ----------------------------------------------------------------------

export default function PostSearch({ posts }: { posts: any }) {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            [`& .${autocompleteClasses.option}`]: {
              typography: "body2",
            },
          },
        },
      }}
      options={posts}
      getOptionLabel={(post: any) => post.title}
      isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search post..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, width: 20, height: 20, color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
