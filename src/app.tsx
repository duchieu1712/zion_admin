import "./global.css";

import ReduxProvider from "./modules/provider";
import Router from "./routes/sections";
import ThemeProvider from "./theme";
import { WagmiConfig } from "wagmi";
import { configWagmi } from "./config/wagmi";
import { useScrollToTop } from "./hooks/use-scroll-to-top";

/* eslint-disable perfectionist/sort-imports */

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <ReduxProvider>
        <WagmiConfig config={configWagmi}>
          <Router />
        </WagmiConfig>
      </ReduxProvider>
    </ThemeProvider>
  );
}
