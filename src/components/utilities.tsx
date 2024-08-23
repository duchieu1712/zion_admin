import { Link } from "@mui/material";
import { ellipseAddress } from "../common/utilities";
import { explorerFromTxhash, explorerFromTxhashCogiChain } from "../common/utilities_config";
import RouterLink from "@/routes/components/router-link";

export function explorerFromTx(tx: string | any): JSX.Element {
  return (
    <Link
      component={RouterLink as any}
      className="t-hover"
      href={explorerFromTxhash(tx.hash)}
      style={{ color: "#757575" }}
      target="_blank"
      rel="noreferrer"
    >
      {ellipseAddress(tx.hash)}
    </Link>
  );
}

export function explorerFromCogiChain(tx: string | any): JSX.Element {
  return (
    <Link
      component={RouterLink as any}
      className="t-hover"
      href={explorerFromTxhashCogiChain(tx)}
      style={{ color: "#757575" }}
      target="_blank"
      rel="noreferrer"
    >
      {ellipseAddress(tx)}
    </Link>
  );
}
