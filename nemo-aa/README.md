# NEMO Account Abstraction SDK for NodeJS

## Installation

```shell
npm install nemo-aa
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following TypeScript code:

### Get JWT

1. Generates an ephemeral key pair.

2. Completes the OAuth login flow.

3. Upon receiving the JSON Web Token (JWT), retrieves a unique user salt and generates a zero-knowledge proof based on the JWT.

4. Get beneficiary accounts.

```typescript
const jwt: string = "<get from login process>"
const payload: JWTPayload = "<get from login process>"
const header: JWTHeader = "<get from login process>"
const index: number = 0
const provider = new providers.JsonRpcProvider("https://rpc.example.com/testnet") // replace with the RPC URL you want to use
const ephemeralKeyPair = Wallet.createRandom().connect(provider)

const salt: string = await fetch('http://example.com/salt', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'jwt': jwt,
      'index': index
    })
  })
  .then((response) => response.text())

const deadline = payload.exp
const proof: ProofPoints = await fetch('http://example.com/zklogin', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'jwt': jwt,
      'salt': salt,
      'signerPublicKey': ephemeralKeyPair.address,
      'exp': deadline,
      'keyClaimName': 'sub'
    })
  })
  .then((response) => response.json())

const beneficiaries: string[] = await fetch("https://example.com/torii/v1/beneficiaries")
  .then((response) => response.json())

const jwtOptions: JWTOptions = {
    header: header,
    payload: payload,
    proof: proof,
    ephemeralKeyPair: ephemeralKeyPair,
    deadline: deadline,
    satl: salt
}
```

### Get the user's address

Upon the conclusion of the OAuth flow, the JWT becomes accessible within the redirect URL. Utilizing this JWT alongside the user salt, the zkLogin address can be derived accordingly:

```typescript
const chainId = "<network's chain id>"
const operatorConfig = getContractWalletOperator(chainId)
const operator = new Operator(operatorConfig, ephemeralKeyPair, beneficiaries) 
// We can use ephemeral to call onchain
const contractWalletAddress = await operator.getAddress(
    payload.sub,
    salt,
    payload.iss,
    payload.aud
)

// Initialize the ContractWallet for interaction with the blockchain.
const contractWallet = new ContractWallet(contractWalletAddress, operator)
contractWallet.setJWT(jwtOptions)
```

If this constitutes the user's first login to the system, it is imperative to initialize the wallet on-chain.

```typescript
// When the wallet has not yet been created, it remains in a read-only state.
if (await contractWallet.isReadonly()) {
  // The wallet needs sufficient balance to cover the transaction fee.
  const requestedPrefundCreateWallet = await contractWallet.getRequiredPrefund()
  const walletBalance = await provider.getBalance(contractWallet.address)
  if (walletBalance.lt(requestedPrefundCreateWallet)) {
    throw new Error("didn't pay prefund")
  }

  const tx = await contractWallet.create()
  await tx.wait()
}
```

### PIN Code Validation and Setting

Setting PIN codes for wallets and updating them on-chain if not already set.

```typescript
const code = "<types from user>"
const hasPINCode = await contractWallet.hasPINCode()
await contractWallet.validateAndSetPINCode(code, !hasPINCode) // If true, set PIN code on-chain; otherwise, don't.
```

Update with a new PIN code.

```typescript
// Confirm the existing PIN code.
const oldCode = "<types from user>"
await contractWallet.validateAndSetPINCode(oldCode, false)

// Verify and change the PIN code.
const newCode = "<types from user>"
await contractWallet.validateAndSetPINCode(newCode, true)
```

### Send the transaction

Example: Transfer ERC20 Tokens

```typescript
const ERC20_ABI = "<ERC20 Application Binary Interface (ABI)>"
const tokenContract = new Contract("<tokenAddress>", ERC20_ABI, ephemeralKeyPair)

const transaction = await tokenContract.populateTransaction.transfer(
    "<from>",
    "<amount>"
)

// The wallet needs sufficient balance to cover the transaction fee.
const tx = await contractWallet.sendTransaction({
    to: transaction.to,
    data: transaction.data,
})
```

Example: Transfer Native Tokens

```typescript
const amount: BigNumber = "<amount>"
// The wallet needs sufficient balance to cover the transaction fee.
const tx = await contractWallet.sendTransaction({
    to: transaction.to,
    value: amount,
})
```