import { SITE_CONFIG } from "@/config/site_config";
import React from "react";
import { Helmet } from "react-helmet-async";

const ApproveCID_ZIONComponent = React.lazy(
  async () => await import("@/sections/approve-zion/view/ApproveCID_ZIONComponent"),
);

// import ApproveCIDComponent from "@/sections/approve/view/Approve";

export default function ApproveZionPage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>
          {SITE_CONFIG.approve_zion} | {SITE_CONFIG.title}{" "}
        </title>
      </Helmet>
      <section className="px-4 pb-20 pt-1 h-screen">
        <ApproveCID_ZIONComponent />
      </section>
    </React.Fragment>
  );
}
