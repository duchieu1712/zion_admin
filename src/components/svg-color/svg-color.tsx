import { forwardRef } from "react";

import Box from "@mui/material/Box";
import { BoxProps, SxProps, Theme } from "@mui/material";

// ----------------------------------------------------------------------

interface SvgColorProps extends Omit<BoxProps, "src" | "sx"> {
  src: string;
  sx?: SxProps<Theme>;
}

const SvgColor = forwardRef<any, SvgColorProps>(({ src, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: "inline-block",
      bgcolor: "currentColor",
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

export default SvgColor;
