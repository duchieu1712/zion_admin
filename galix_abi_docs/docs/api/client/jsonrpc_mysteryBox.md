### SIG
Sử dụng signTypedData_v4 hoặc personal_sign
```bash
NONCE #nonce hiện tại của tài khoản trên blockchain
DEADLINE #thời gian tồn tại của chữ ký
SIGNATURE #chữ ký
LANDLV #level hiện tại của land trên blockchain
FEE #Chi phí Mint NFT 
MESSAGE

#signTypedData_v4
{"nonce": $NONCE,"deadline": $DEADLINE,"signature": $SIGNATURE}

#personal_sign
{"message": $MESSAGE,"signature": $SIGNATURE}

#signTypedData_v4 Mint With Fee
{"nonce": $NONCE,"deadline": $DEADLINE,"signature": $SIGNATURE, "fee":$FEE}


#signTypedData_v4 Upgrade Land With Fee
{"landlv": $LANDLV,"deadline": $DEADLINE,"signature": $SIGNATURE, "fee":$FEE}

```


### BOX
Xem ví dụ: 

Xem demo: 

```bash
ID #id RPC
ENDPOINT #đường dẫn tới api server, ví dụ: ws://localhost:5555/ws
NAMESPACE #Phân biệt Box cho từng loại Box, ví dụ namespace cho Gold Box là: erc721_galixnft_gbox
SIG #chữ ký
CID #ipfs cid

#Open Box
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.request_openbox","params":[$SIG, $CID]}

#Get Box Open Failed
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.get_boxsfailed","params":[$SIG]}

[{"jsonrpc": "2.0", "result": {}]
```
