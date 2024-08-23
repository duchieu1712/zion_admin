import { Provider } from "react-redux";
import { createContext, PropsWithChildren } from "react";

import { store } from ".";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store as any}>{children}</Provider>;
}
