import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Paper from "@mui/material/Paper";
import { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import { fShortenNumber } from "../../utils/format-number";

// ----------------------------------------------------------------------

export default function AppTrafficBySite({
  title,
  subheader,
  list,
  ...other
}: {
  title: string;
  subheader?: ReactNode;
  list: any[];
  other?: any;
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box
        sx={{
          p: 3,
          gap: 2,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {list.map((site) => (
          <Paper
            key={site.name}
            variant="outlined"
            sx={{ py: 2.5, textAlign: "center", borderStyle: "dashed" }}
          >
            <Box sx={{ mb: 0.5 }}>{site.icon}</Box>

            <Typography variant="h6">{fShortenNumber(site.value)}</Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {site.name}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Card>
  );
}
