import { Helmet } from "react-helmet-async";
import LoginView from "../sections/login/login-view";
import React from "react";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <React.Fragment>
      <Helmet>
        <title> Login | Zion Admin </title>
      </Helmet>

      <LoginView />
    </React.Fragment>
  );
}
