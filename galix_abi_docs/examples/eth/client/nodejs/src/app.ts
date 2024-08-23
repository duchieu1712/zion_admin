import { GalixERC20AbiIface } from "./abi";

import { utils } from "ethers";
import axios from "axios";
import { assert } from "console";
import { parseEther } from "ethers/lib/utils";

const rpcEndpoint = "https://rpc.nemoverse.io/galixcity-v2-testnet";
const rpcExec = async <T>(method: string, params: any): Promise<T> => {
  try {
    const response = await axios.post<T>(
      rpcEndpoint,
      {
        jsonrpc: "2.0",
        id: 1,
        method: method,
        params: params,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Error in 'rpcExec(${method} ${params})': ${error.message}`
    );
  }
};

const nemoCoinContractAddress = "0x1c753dD9955782aC974798A6f65dfFe03f217841";
const nemoCoinHolders = {
  "0xEd22b7a9813647290F8fbef9d6A422FF44dCD913": utils.parseEther("999201"),
  "0xdd882a2a37eE8f3be81e3Df89a7b4d3EB59CB143": utils.parseEther("99300"),
  "0x0F07Acd2cc5f9b116698736766998465aC13c70D": utils.parseEther("400"),
};

const loginJson = {
  email: "tech@nemoverse.io",
  password: "12345ABC#$%",
};

const main = async () => {
  //login
  const res = await rpcExec("nemo_id.user_login", [loginJson]);
  assert(res["result"] !== undefined, `Failed nemo_id.user_login ${loginJson}`);
  const sig = res["result"]["data"]["signature"];

  //balanceOf
  /* eslint-disable @typescript-eslint/no-unused-vars */
  for (const [k, v] of Object.entries(nemoCoinHolders)) {
    const data = GalixERC20AbiIface.encodeFunctionData("balanceOf", [k]);
    const tx = {
      to: nemoCoinContractAddress,
      data: data,
    };
    const res = await rpcExec("eth_call", [sig, tx]);
    assert(
      res["result"] !== undefined,
      `Failed eth_call ${JSON.stringify([sig, tx, res])}`
    );
    const b = utils.parseEther(
      utils.formatEther(utils.hexValue(res["result"]))
    );
    assert(b.eq(v), `balanceOf ${k} ${utils.formatEther(b)}`);
  }

  //Transfer
  for (const [k, v] of Object.entries(nemoCoinHolders)) {
    const data = GalixERC20AbiIface.encodeFunctionData("transfer", [
      k,
      parseEther("1"),
    ]);
    const tx = {
      to: nemoCoinContractAddress,
      data: data,
    };
    const res = await rpcExec("eth_sendRawTransaction", [sig, tx]);
    assert(
      res["result"] !== undefined,
      `Failed eth_sendRawTransaction ${JSON.stringify([sig, tx, res])}`
    );
    /* eslint-disable no-console */
    console.log(`https://testnet.cogiscan.io/tx/${res["result"]}`);
  }
};

main();
