import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { cf_Chains } from "@/context/web3modal";
import { BrowserProvider, ethers, Signer } from "ethers";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { recoverTypedSignature, SignTypedDataVersion } from "@metamask/eth-sig-util";

import { Client } from "@/context/broker";
import { ButtonComponent } from "@/components/button/ButtonCompnent";
import { SwitchChainComponent } from "@/components/modals/chain-account";

export default function InfoCIDComponent(props: any) {
  const brokerEndpoint = process.env.API_ZIONXNETWORK || "";
  const orgBrokerEndpoint = process.env.ORIGINAL_API_ZIONXNETWORK || "";

  const { isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider }: { walletProvider: any } = useWeb3ModalProvider();

  const { address } = useWeb3ModalAccount();

  const [loadData, setLoadData] = useState(false);
  const [operator, setOperator] = useState<any>(null);
  const [eip712, setEip712] = useState<any>(null);
  const [switchToChain, setSwitchToChain] = useState<any>(null);
  const [lstSigned, setLstSigned] = useState<any>([]);

  useEffect(() => {
    if (!loadData) return;
    getInfoCid(props.cid);
  }, [loadData]);

  useEffect(() => {
    setLoadData(true);
  }, []);

  useEffect(() => {
    if (eip712 && chainId) {
      if (eip712?.domain?.chainId?.toString() != chainId.toString()) {
        let chainChange = {
          chainId: eip712?.domain?.chainId?.toString(),
        };
        for (let i = 0; i < cf_Chains.length; i++) {
          if (cf_Chains[i].chainId == eip712?.domain?.chainId?.toString()) {
            chainChange = cf_Chains[i];
            break;
          }
        }
        setSwitchToChain(null);
        setSwitchToChain(chainChange);
        return;
      }
    }
  }, [chainId, eip712]);

  async function getInfoCid(cid: string): Promise<void> {
    try {
      const bc = new Client(brokerEndpoint, orgBrokerEndpoint);
      const [_operator, _eip712] = await bc.get(cid);
      setOperator(_operator);
      setEip712(_eip712);
      //
      const _lstSigned: any[] = [];
      const ret = await bc.pull(cid);
      for (const s of ret) {
        const signer = ethers.getAddress(
          recoverTypedSignature({
            data: _eip712 as any,
            signature: s,
            version: SignTypedDataVersion.V4,
          }),
        );
        _lstSigned.push(signer?.toLowerCase());
      }
      setLstSigned(_lstSigned);
      setLoadData(false);
    } catch (e: any) {
      toast.error(e.message);
      setLoadData(false);
    }
  }

  async function signAndPush(bc: Client, cid: string, signer: Signer) {
    try {
      const [operators, eip712] = await bc.get(cid);
      if (eip712 == null) {
        throw Error(`Invalid cid:${cid}`);
      }
      const address = await signer.getAddress();
      if (!operators.includes(address)) {
        throw Error(`Invalid operator wallet:${address} operators:${operators}`);
      }
      delete eip712.types["EIP712Domain"];
      const signature = await signer.signTypedData(
        eip712.domain,
        eip712.types as any,
        eip712.message,
      );
      await bc.push(cid, signature);
    } catch (e: any) {
      throw Error(e);
    }
  }

  const approveCID = async (cid: string) => {
    try {
      const bc = new Client(brokerEndpoint, orgBrokerEndpoint);
      const provider = new BrowserProvider(walletProvider);
      await signAndPush(bc, cid, await provider.getSigner());
      toast.success("Approved is successful");
      setLoadData(true);
      // check try full
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (loadData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {eip712 ? (
        <div className="break-all"> Please Approve for: {props.cid}</div>
      ) : (
        <div className="break-all"> {props.cid} does not exist</div>
      )}
      {isConnected && !operator?.includes(address) && (
        <p className="text-red break-all">You can not Approve CID</p>
      )}
      <ButtonComponent
        title={lstSigned?.includes(address?.toLowerCase()) ? "Approved" : "Approve"}
        onClick={() => {
          approveCID(props.cid);
        }}
        width={"w-[200px]"}
        disabled={
          !isConnected ||
          !operator?.includes(address) ||
          lstSigned?.includes(address?.toLowerCase())
        }
      />
      <SwitchChainComponent
        switchToChain={switchToChain}
        setSwitchToChain={setSwitchToChain}
        backgroundModal="bg-dark"
      />
    </div>
  );
}
