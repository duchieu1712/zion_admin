import * as AccountReducers from "@/modules/account/reducers";

import { Navigate, useLocation } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Header from "./header";
import { LOCALE_STORAGE } from "@/common/enum";
import Main from "./main";
import Nav from "./nav";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const accountWeb = useSelector(AccountReducers.dataAccount);
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  return accountWeb ? (
    <Fragment>
      {accountWeb && <Header onOpenNav={() => setOpenNav(true)} />}

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {accountWeb && <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />}

        <Main>{children}</Main>
      </Box>
    </Fragment>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
}

// DashboardLayout.propTypes = {
//   children: PropTypes.node,
// };
