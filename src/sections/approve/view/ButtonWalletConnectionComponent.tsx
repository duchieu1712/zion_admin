import { cf_Chains } from "@/context/web3modal";
import { useDisconnect, useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

import { ButtonComponent } from "@/components/button/ButtonCompnent";

export default function ButtonWalletConnectionApproveComponent() {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { isConnected, address, chainId } = useWeb3ModalAccount();

  return !isConnected ? (
    <ButtonComponent
      title={"Please Connect Wallet"}
      onClick={() => open()}
      className="mt-6"
      width={"w-[200px]"}
    />
  ) : (
    <div className="flex flex-col gap-2 mt-2 items-center justify-center">
      <p>Address connected: {address}</p>
      <p>Network: {cf_Chains?.find((e) => e.chainId == chainId)?.name ?? chainId}</p>
      <ButtonComponent
        title={"Disconnect"}
        onClick={disconnect}
        transparent={true}
        width={"w-[200px]"}
      />
    </div>
  );
}
