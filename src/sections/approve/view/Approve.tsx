import { useSearchParams } from "react-router-dom";

import InfoCIDComponent from "./InfoCIDComponent";
import ButtonWalletConnectionApproveComponent from "./ButtonWalletConnectionComponent";

// const InfoCIDComponent = dynamic(
//   async () => await import('./InfoCIDComponent'),
//   {
//     ssr: false,
//   },
// )

// const ButtonWalletConnectionComponent = dynamic(
//   async () => await import('./ButtonWalletConnectionComponent'),
//   {
//     ssr: false,
//   },
// )

export default function ApproveCIDComponent() {
  const [searchParam] = useSearchParams();
  const cid = searchParam.get("cid");
  if (!cid) return <p>Not contain CID</p>;

  return (
    <div className="m-auto max-w-[800px] flex flex-col gap-6 mt-20 items-center justify-center p-9 bg-gray-900 rounded-lg m">
      <InfoCIDComponent cid={cid} />
      <ButtonWalletConnectionApproveComponent />
    </div>
  );
}
