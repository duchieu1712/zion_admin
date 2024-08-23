import { Helmet } from "react-helmet-async";
import React from "react";
import { SITE_CONFIG } from "@/config/site_config";
import Typography from "@mui/material/Typography";

const ApproveCIDComponent = React.lazy(async () => await import("@/sections/approve/view/Approve"));

// import ApproveCIDComponent from "@/sections/approve/view/Approve";

export default function ApprovePage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>
          {SITE_CONFIG.approve} | {SITE_CONFIG.title}{" "}
        </title>
      </Helmet>
      <section className="px-4 pb-20 pt-1 h-screen">
        <ApproveCIDComponent />
        <Typography>test cicd</Typography>
      </section>
    </React.Fragment>
  );
}
