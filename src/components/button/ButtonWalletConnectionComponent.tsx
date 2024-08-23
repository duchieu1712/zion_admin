import { useDisconnect, useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

import { ButtonComponent } from "./ButtonCompnent";
import { toast } from "react-toastify";
import { descyptNEMOWallet, ellipseText } from "@/common/utilities";

export default function ButtonWalletConnectionComponent() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();
  return isConnected ? (
    <div className="mt-6">
      <p className="text-primary">Your Wallet :</p>
      <button
        className="w-full border-grey border p-2 rounded-lg flex justify-between items-center transition-all duration-150 active:opacity-55"
        onClick={async () => {
          await navigator.clipboard.writeText(descyptNEMOWallet(address));
          toast.success("Copied");
        }}
      >
        <p className="dark:text-white text-sm">{ellipseText(descyptNEMOWallet(address), 15)}</p>
      </button>
      <ButtonComponent
        title="Disconnect"
        transparent
        className="mt-4 mb-3"
        onClick={() => disconnect()}
      />
    </div>
  ) : (
    <>
      <ButtonComponent title="Connect Wallet" onClick={open} className="mt-6" />
    </>
  );
}
