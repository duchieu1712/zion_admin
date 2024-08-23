### SIG
Sử dụng signTypedData_v4 hoặc personal_sign
```bash
NONCE #nonce hiện tại của tài khoản trên blockchain
DEADLINE #thời gian tồn tại của chữ ký
SIGNATURE #chữ ký
MESSAGE

#signTypedData_v4
{"nonce": $NONCE,"deadline": $DEADLINE,"signature": $SIGNATURE}

#personal_sign
{"message": $MESSAGE,"signature": $SIGNATURE}
```

### HOTWALLET
Xem ví dụ: [examples/KogiERC20HotWallet/client](../../../examples/KogiERC20HotWallet/client)

Xem demo: [hotwallet-example](http://171.244.21.104/hotwallet-example/)

```bash
ID #id RPC
ENDPOINT #đường dẫn tới api server, ví dụ: ws://localhost:5555/ws
NAMESPACE #phân biệt hotwallet cho từng loại coin, ví dụ namespace cho cogi coin hotwallet là: cogi_hotwallet
SIG #chữ ký ví nemo
SUB_SIG #chữ ký ví metamask
AMOUNT #số tiền cần rút

#xem số dư tài khoản
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.get_balance","params":[$SIG]}

#xem toàn bộ giao dịch
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.get_transactions","params":[$SIG]}

#rút tiền về ví metamask
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.request_withdraw","params":[$SIG,$SUB_SIG,$AMOUNT]}

[{"jsonrpc": "2.0", "result": {}]
```

### NFT
Xem ví dụ: [examples/nft/client](../../../examples/nft/client)

```bash
ID #id RPC
ENDPOINT #đường dẫn tới api server, ví dụ: ws://localhost:5555/ws
NAMESPACE #phân biệt hotwallet cho từng loại coin, ví dụ namespace cho cogi coin hotwallet là: cogi_hotwallet
SIG #chữ ký ví metamask
CID #ipfs cid

#xem nft có thể rút về ví
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.get_claimable","params":[$SIG]}

#rút nft về ví
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.request_claim","params":[$SIG, $CID]}

[{"jsonrpc": "2.0", "result": {}]
```

### Account
Xem ví dụ: [examples/account/client](../../../examples/account/client)

```bash
ID #id RPC
ENDPOINT #đường dẫn tới api server, ví dụ: ws://localhost:5555/ws
SIG #chữ ký ví nemo
SUB_SIG #chữ ký ví metamask

#liên kết ví metamask vào ví nemo
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"nemo_account.add_link","params":[$SIG, $SUB_SIG]}

#xem tất cả ví metamask đã liên kết vào ví nemo
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"nemo_account.get_link","params":[$SIG]}

[{"jsonrpc": "2.0", "result": {}]
```

### Nemo ID
Xem ví dụ: [examples/nemo_id/client](../../../examples/nemo_id/client)

```bash
ID #id RPC
ENDPOINT #đường dẫn tới api server, ví dụ: ws://localhost:5555/ws
METHOD #path tương ứng gửi về nemo id (https://iduat.nemoverse.io), thay thế / với _, ví dụ user/signup chuyển thành user_signup
PARAMS #json data gửi về nemo id
NEMO_ID_RESPONSE #phản hồi từ nemo id
SIG #chữ ký ví nemo

wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":1,"method":"nemo_id.$METHOD","params":[$PARAMS]}

#đối với signup, signupWithPhone params temp_address để trống - api sẽ tự động tạo và thêm vào

#đối với login, loginWithPhone phản hồi như sau 
{"jsonrpc": "2.0", "method": "user_login", "namespace": "nemo_id", "result": {$NEMO_ID_RESPONSE + $SIG}, "id": 1}
```

### ETH
Xem ví dụ: [examples/eth/client](../../../examples/eth/client)

```bash
ID #id RPC
ENDPOINT #đường dẫn tới api server, ví dụ: https://rpc.nemoverse.io/galixcity-v2-testnet
CALL_PARAMS #data gửi về  cogi chain, xem thêm tài liệu https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call
RAW_PARAMS #data gửi về  cogi chain, xem thêm tài liệu https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction
SIG #chữ ký ví nemo nhận được sau khi login (nemo_id.login hoặc nemo_id.loginWithPhone)

#Gọi vào blockchain, sử dụng cho smartcontract function đọc dữ liệu
// Request
curl -X POST $ENDPOINT --data '{"jsonrpc":"2.0","method":"eth_call","params":[$SIG,$CALL_PARAMS],"id":1}'
// Response
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}

#Tạo blockchain transaction, sử dụng cho smartcontract function lưu dữ liệu
// Request
curl -X POST $ENDPOINT --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[$SIG,$RAW_PARAMS],"id":1}'
// Response
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```