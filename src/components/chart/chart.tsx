import { alpha, styled } from "@mui/material/styles";

import ApexChart from "react-apexcharts";
import { Theme } from "@mui/system/createTheme";
import { bgBlur } from "../../theme/css";
import { memo } from "react";

// import { bgBlur } from "../theme/css";

// ----------------------------------------------------------------------

const Chart = styled(ApexChart)(({ theme }: { theme: Theme & any }) => ({
  "& .apexcharts-canvas": {
    // Tooltip
    "& .apexcharts-tooltip": {
      ...bgBlur({
        color: theme.palette.background.default,
      }),
      color: theme.palette.text.primary,
      boxShadow: theme.customShadows.dropdown,
      borderRadius: theme.shape.borderRadius * 1.25,
      "&.apexcharts-theme-light": {
        borderColor: "transparent",
        ...bgBlur({
          color: theme.palette.background.default,
        }),
      },
    },
    "& .apexcharts-xaxistooltip": {
      ...bgBlur({
        color: theme.palette.background.default,
      }),
      borderColor: "transparent",
      color: theme.palette.text.primary,
      boxShadow: theme.customShadows.dropdown,
      borderRadius: theme.shape.borderRadius * 1.25,
      "&:before": {
        borderBottomColor: alpha(theme.palette.grey[500], 0.24),
      },
      "&:after": {
        borderBottomColor: alpha(theme.palette.background.default, 0.8),
      },
    },
    "& .apexcharts-tooltip-title": {
      textAlign: "center",
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: alpha(theme.palette.grey[500], 0.08),
      color: theme.palette.text[theme.palette.mode === "light" ? "secondary" : "primary"],
    },

    // LEGEND
    "& .apexcharts-legend": {
      padding: 0,
    },
    "& .apexcharts-legend-series": {
      display: "inline-flex !important",
      alignItems: "center",
    },
    "& .apexcharts-legend-marker": {
      marginRight: 8,
    },
    "& .apexcharts-legend-text": {
      lineHeight: "18px",
      textTransform: "capitalize",
    },
  },
}));

export default memo(Chart);
