import { memo, forwardRef, ReactNode } from "react";

import Box from "@mui/material/Box";

import { StyledScrollbar, StyledRootScrollbar } from "./styles";
import { SxProps, Theme } from "@mui/material";

// ----------------------------------------------------------------------

const Scrollbar = forwardRef(
  ({ children, sx, ...other }: { children: ReactNode; sx?: SxProps<Theme>; other?: any }, ref) => {
    const userAgent = typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (mobile) {
      return (
        <Box ref={ref} sx={{ overflow: "auto", ...sx }} {...other}>
          {children}
        </Box>
      );
    }

    return (
      <StyledRootScrollbar>
        <StyledScrollbar
          scrollableNodeProps={{
            ref,
          }}
          clickOnTrack={false}
          sx={sx}
          {...other}
        >
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  },
);

export default memo(Scrollbar);
