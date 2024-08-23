import { forwardRef } from "react";
import Box from "@mui/material/Box";
import { BoxProps, SxProps, Theme } from "@mui/material";
import { Icon, IconifyIcon } from "@iconify/react";

interface IconifyProps extends Omit<BoxProps, "icon | sx"> {
  icon: IconifyIcon | string;
  sx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

const Iconify = forwardRef<any, IconifyProps>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

// Iconify.propTypes = {
//   icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
//   sx: PropTypes.object,
//   width: PropTypes.number,
// };

export default Iconify;
