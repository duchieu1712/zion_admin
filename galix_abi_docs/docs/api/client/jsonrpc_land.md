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


### INFO LAND + MYSTERY
Xem ví dụ: 

Xem demo: 
```bash
ID #id RPC
ENDPOINT #đường dẫn tới api server, ví dụ: ws://localhost:5555/ws
NAMESPACE # Trong trường hợp này sẽ gọi namespace của Land.
SIG #chữ ký
CID #ipfs cid
LAND_ID # ID của Land
ZONE_ID #ID Zone 

#Get thông tin Land đang sở hữu
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.get_landinfo","params":[$SIG]}

#Get Fee Mint resource of Land
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.get_claimawardfee","params":[$SIG, $LAND_ID]}

#Get Lands info of Zone
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.get_zonelands","params":[$ZONE_ID]}

#Get Land info With id
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.get_landinfoid","params":[$LAND_ID]}

#Xem thông tin Mystery House 
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.get_mysteryinfo","params":[$SIG]}

#Xem thông tin giảm CoolDown trong Mystery House
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.get_speedupinfo","params":[$SIG]}

[{"jsonrpc": "2.0", "result": {}]
```

### NFT
Xem ví dụ: [examples/nft/client](../../../examples/nft/client)

```bash
ID #id RPC
ENDPOINT #đường dẫn tới api server, ví dụ: ws://localhost:5555/ws
NAMESPACE # Trong trường hợp này sẽ gọi namespace của Land.
SIG #chữ ký
CID #ipfs cid
NAMESPACE_TYPE_NFT # Namespace của Loại NFT được Mint
ID_RESOURCE # ID của gói resource
LAND_ID # ID của Land
FEE #Fee mint Item


#------------------------------- MYSTERY HOUSE ------------------------------------------------
#Mint Hero -> Request Mystery House
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.request_summon","params":[$SIG, $NAMESPACE_TYPE_NFT]}

#Request Hủy CoolDown của Summon
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.request_speedup","params":[$SIG]}

#------------------------------- LAND ------------------------------------------------
#CLaim Resource NFT
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.request_claimaward","params":[$SIG, $ID_RESOURCE, $CID, $FEE, $NAMESPACE_TYPE_NFT]}

#CLaim Token
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.request_claimtoken","params":[$SIG, $CID, $NAMESPACE_TYPE_NFT]}

#BUY LAND
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.request_buyland","params":[$SIG, $CID]}

# ---------------- UPGRADE LAND ------------------------
#Get Info Upgrade Land
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.get_upgradeinfo","params":[$SIG, $CID]}
#UPGRADE LAND
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"$NAMESPACE.request_upgradeland","params":[$SIG, $CID]}


[{"jsonrpc": "2.0", "result": {}]
```