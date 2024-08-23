import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ethers, Signer, Wallet } from "ethers";
import { useSelector } from "react-redux";
import * as AccountReducers from "@/modules/account/reducers";
import { LOCALE_STORAGE } from "@/common/enum";
import { decryptData } from "@/common/utilities";
import { recoverTypedSignature, SignTypedDataVersion } from "@metamask/eth-sig-util";
import { Client } from "@/context/broker";
import { ButtonComponent } from "@/components/button/ButtonCompnent";
// import { ContractWallet } from "nemo-aa/lib/contract-wallet";

export default function InfoCID_ZIONComponent(props: any) {
  const accountWeb = useSelector(AccountReducers.dataAccount);
  // const contractWallet: ContractWallet = useSelector(AccountReducers.contractWalletAA);
  const contractWallet: any = useSelector(AccountReducers.contractWalletAA);
  const [loadData, setLoadData] = useState(false);
  const [operator, setOperator] = useState<any>(null);
  const [lstSigned, setLstSigned] = useState<any>([]);

  useEffect(() => {
    if (!loadData) return;
    getInfoCid(props.cid);
  }, [loadData]);

  useEffect(() => {
    if (accountWeb) {
      setLoadData(false);
      setLoadData(true);
    }
  }, [accountWeb]);

  async function getInfoCid(cid: string): Promise<void> {
    const brokerEndpoint =
      process.env["BROKER"] != undefined
        ? process.env["BROKER"]
        : "https://broker-multisig-wallet.zionx.network";
    const bc = new Client(brokerEndpoint);
    const [_operator, _eip712] = await bc.get(cid);
    setOperator(_operator?.map((o: any) => o.toLowerCase()));
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
    //
    setLoadData(false);
  }

  async function signAndPush(bc: Client, cid: string, signer: Signer) {
    try {
      const [_, eip712] = await bc.get(cid);
      if (eip712 == null) {
        throw Error(`Invalid cid:${cid}`);
      }
      const address = accountWeb?.nemo_address?.toLowerCase();
      if (!operator.includes(address)) {
        throw Error(`Invalid operator wallet:${address} operators:${operator}`);
      }
      delete eip712.types["EIP712Domain"];
      //
      const data = localStorage.getItem(LOCALE_STORAGE.CONTRACTWALLETAA);
      const decryptDatat = decryptData(data);
      if (decryptDatat) {
        const jsonData = JSON.parse(decryptDatat);
        const endpoint = process.env.NEXT_PUBLIC_SERVER_RPC_ZIONX ?? "";
        const ephemeralKeyPair = new Wallet(jsonData.ephemeralKeyPairPrivateKey).connect(
          new ethers.JsonRpcProvider(endpoint),
        );
        //
        const signature = await ephemeralKeyPair.signTypedData(
          eip712.domain,
          eip712.types as any,
          eip712.message,
        );
        await bc.push(cid, signature);
      }
    } catch (e: any) {
      throw e;
    }
  }

  const approveCID = async (cid: string) => {
    try {
      const brokerEndpoint =
        process.env["BROKER"] != undefined
          ? process.env["BROKER"]
          : "https://broker-multisig-wallet.zionx.network";
      const bc = new Client(brokerEndpoint);
      await signAndPush(bc, cid, contractWallet.signer as any);
      toast.success("Approved is successful");
      // check try full
      tryPull(bc, cid);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
    }
  };

  async function tryPull(bc: Client, cid: string): Promise<void> {
    const str = await bc.pull(cid);
    if (!str) return;
    if (str.length == 2) {
    }
  }

  if (loadData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div> Please Approve for: {props.cid}</div>
      {accountWeb && !operator?.includes(accountWeb?.nemo_address?.toLowerCase()) && (
        <p>You can not Approve CID</p>
      )}
      <ButtonComponent
        title={
          lstSigned?.includes(accountWeb?.nemo_address?.toLowerCase()) ? "Approved" : "Approve"
        }
        onClick={() => {
          approveCID(props.cid);
        }}
        width={"w-[200px]"}
        disabled={
          !accountWeb ||
          !operator?.includes(accountWeb?.nemo_address?.toLowerCase()) ||
          lstSigned?.includes(accountWeb?.nemo_address?.toLowerCase())
        }
      />
    </div>
  );
}
