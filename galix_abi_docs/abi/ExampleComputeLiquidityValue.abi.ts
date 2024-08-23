import { AbiItem } from 'web3-utils';

export default [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "factory_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "factory",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "truePriceTokenA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "truePriceTokenB",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "liquidityAmount",
        "type": "uint256"
      }
    ],
    "name": "getGasCostOfGetLiquidityValueAfterArbitrageToPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "liquidityAmount",
        "type": "uint256"
      }
    ],
    "name": "getLiquidityValue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tokenAAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokenBAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "truePriceTokenA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "truePriceTokenB",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "liquidityAmount",
        "type": "uint256"
      }
    ],
    "name": "getLiquidityValueAfterArbitrageToPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tokenAAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokenBAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "truePriceTokenA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "truePriceTokenB",
        "type": "uint256"
      }
    ],
    "name": "getReservesAfterArbitrage",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "reserveA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveB",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as unknown as AbiItem[];
