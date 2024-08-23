import { AbiItem } from 'web3-utils';

export default [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "service",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "onProxyCalled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as unknown as AbiItem[];
