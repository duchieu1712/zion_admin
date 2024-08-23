import { Helmet } from "react-helmet-async";

import AppView from "../sections/overview/view/app-view";
import React from "react";

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <React.Fragment>
      <Helmet>
        <title> Dashboard | Zion Admin </title>
      </Helmet>

      <AppView />
    </React.Fragment>
  );
}
