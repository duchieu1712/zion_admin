import { IMAGES } from "@/theme/theme";
import ButtonWalletConnectionComponent from "../button/ButtonWalletConnectionComponent";
import ActionModal from "./modal";

export function SwitchChainComponent({
  switchToChain,
  setSwitchToChain,
  backgroundModal,
}: {
  switchToChain: any;
  setSwitchToChain: any;
  backgroundModal?: string;
}) {
  return (
    <ActionModal
      openModal={switchToChain != null}
      closeModal={() => {
        setSwitchToChain(null);
      }}
      backgroundColor={backgroundModal}
    >
      <p className="text-[#fe8e16] text-3xl font-bold uppercase text-center mb-4">
        Network is wrong
      </p>

      <img src={IMAGES.wrong_network} width={100} height={100} alt="" className="mx-auto" />

      <p className="text-base text-center my-2 dark:text-white">
        Please switch to the correct network: {switchToChain?.name ?? switchToChain?.chainId}
      </p>
      <div className="w-full">
        <ButtonWalletConnectionComponent />
      </div>
    </ActionModal>
  );
}
