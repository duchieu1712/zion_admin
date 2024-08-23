## STATUS
```bash
# Mã lỗi = 0 và mã lỗi > 2: Lời gọi API được đưa vào hàng đợi và trả dữ liệu về callback
50 # NFT đã chuyển sang ví khác
3 # Lời gọi API đã được xử lý thành công
2 # Đã gửi transaction lên blockchain
0 # Đưa lời gọi API vào hàng đợi thành công    

# Mã lỗi = 1: Lời gọi API được xử lý ngay lập tức, và thành công
1 # Xử lý lời gọi API thành công

# Mã lỗi < 0: Xử lý lời gọi API thất bại
-1 # NFT này đã tồn tại
-3 # Xử lý lời gọi API thất bại
-5 # Convert nft đã bị hủy
-10 # Mint NFT thất bại
-11 # Convert nft thất bại
-50 # NFT đã bị đốt
-500 # Xử lý lời gọi API thất bại 
```

## NFT STATUS
```bash
Mint: #NFT_MINT_CID_WAIT > TX_SUBMIT_WAIT > TX_CONFIRM_WAIT > TX_SUCCESS
Convert NFT: #NFT_REQUEST_MINT_CID_WAIT > NFT_REQUEST_MINT_DAPP_WAIT > NFT_REQUEST_MINT_TX_SUBMIT_WAIT > NFT_REQUEST_MINT_TX_CONFIRM_WAIT > TX_SUCCESS

NFT_MINT_CID_WAIT: #Chờ tạo CID từ IPFS
TX_SUBMIT_WAIT: #Chờ gửi transaction tạo NFT tới blockchain
TX_CONFIRM_WAIT: #Chờ kết quả transaction tạo NFT từ blockchain
TX_SUCCESS: #Tạo NFT thành công
NFT_MINT_CID_FAILED: #Tạo CID từ IPFS thất bại
NFT_MINT_FAILED: #Tạo NFT thất bại

NFT_REQUEST_MINT_CID_WAIT: #Chờ tạo CID từ IPFS
NFT_REQUEST_MINT_DAPP_WAIT: #Chờ marketplace tạo transaction convert NFT
NFT_REQUEST_MINT_TX_SUBMIT_WAIT: #Chờ marketplace gửi transaction tạo NFT tới blockchain
NFT_REQUEST_MINT_TX_CONFIRM_WAIT: #Chờ kết quả transaction tạo NFT từ blockchain
TX_SUCCESS: #Tạo NFT thành công
NFT_REQUEST_MINT_DAPP_CANCELED: #Marketplace hủy convert NFT
NFT_REQUEST_MINT_CID_FAILED: #Tạo CID từ IPFS thất bại
NFT_REQUEST_MINT_FAILED: #Tạo NFT thất bại
```

## CALLBACK
Hỗ trợ http callback và RPC

```bash
# NFT_REQUEST_MINT_FAILED, NFT_MINT_FAILED
{
	"status": <ENUM>,
	"uuid": <request uuid>,
	"namespace": <request namespace>,
	"params": {
	    "owner": <nft owner>,
	    "txhash": <transaction hash>,
	    "cid": <ipfs cid>,
	    "address": <nft contract address>
	}
}
```

```bash
# NFT TX_SUCCESS, BURNED
{
	"status": <ENUM>,
	"uuid": <request uuid>,
	"namespace": <request namespace>,
    "params": {
    	"owner": <nft owner>,
	    "txhash": <transaction hash>,
	    "cid": <ipfs cid>,
	    "address": <nft contract address>,
	    "token_id": <nft token id>,
    }
}
```

```bash
# NFT TRANSFER
{
	"status": <ENUM>,
	"uuid": <request uuid>,
	"namespace": <request namespace>,
    "params": {
    	"owner": <nft owner>,
    	'to': <nft receiver>,
	    "txhash": <transaction hash>,
	    "cid": <ipfs cid>,
	    "address": <nft contract address>,
	    "token_id": <nft token id>,
    }
}
```

### API MINT NFT
![api mint nft](api_server-mint-nft.png)
GameServer [ví dụ](../api_server/mint_nft.sh)
```bash
TOKEN #thông tin xác thực API (Bearer authentication)
ENDPOINT #đường dẫn tới api server, ví dụ: http://localhost:5555
DATA_JSON_PATH #đường dẫn tới file NFT metadata, ví dụ: 358018_raw.json
curl -X POST "$ENDPOINT/api/v1/nft/mint" \
     -H "Accept: application/json" \
     -H "Content-Type:application/json" \
     -H "Authorization: Bearer $TOKEN" \
     --data @$DATA_JSON_PATH -vvv

Response: {"status": $STATUS}
STATUS #trạng thái thực thi mint NFT, xem thêm STATUS
```

web browser [ví dụ](../api_server/mint_nft_raw.sh)
```bash
TOKEN #thông tin xác thực API (Bearer authentication)
ENDPOINT #đường dẫn tới api server, ví dụ: http://localhost:5555
IMAGE_PATH #đường dẫn tới file image, ví dụ: 358018.png
DATA_JSON_PATH #đường dẫn tới file NFT metadata, ví dụ: 358018_raw.json
TO #địa chỉ ví nhận NFT token sau khi mint, ví dụ: 0x533B27f8a64168DFAad9885495fC5E35AB5a747F
curl -X POST "$ENDPOINT/api/v1/nft/mint_raw" \
     -H "Content-Type: multipart/form-data" \
     -H "Authorization: Bearer $TOKEN" \
     -F "image_blob=@$IMAGE_PATH" \
     -F "data=@$DATA_JSON_PATH" \
     -F "recipient=$TO"

Response: {"status": $STATUS}
STATUS #trạng thái thực thi mint NFT, xem thêm STATUS
```

### API PAYMENT
Yêu cầu người dùng gọi contract KOGIERC20.approve, xem ví dụ: http://171.244.21.104/payment-example/

```bash
ACT #charge: thanh toán, get_balance: lấy số dư, award: nhận token
TOKEN #thông tin xác thực API (Bearer authentication)
ENDPOINT #đường dẫn tới api server, ví dụ: http://localhost:5555
DATA_JSON_PATH #đường dẫn tới PAYLOAD
curl -X POST "$ENDPOINT/api/v1/payment/$ACT" \
     -H "Accept: application/json" \
     -H "Content-Type:application/json" \
     -H "Authorization: Bearer $TOKEN" \
     --data @$DATA_JSON_PATH -vvv

PAYLOAD
#award
{
    "recipient": "<địa chỉ ví nhận>",
    "amount": <số lượng coin>,
    "callback": "<rpc/http>"
}

#get_balance
{
    "address": "<địa chỉ ví cần kiểm tra>",
}

#charge
{
    "from": "<địa chỉ ví thanh toán>",
    "amount": <số lượng coin>,
    "callback": "<rpc/http>"
}

Response: {"status": $STATUS}
STATUS #trạng thái thực thi mint NFT, xem thêm STATUS
```

### HOTWALLET SERVER API
![Hotwallet](cogi-hotwallet.png)

Xem ví dụ: [examples/KogiERC20HotWallet/server](../../examples/KogiERC20HotWallet/server)

```bash
ACT #charge: thanh toán, balance: lấy số dư, award: nhận token, transactions: xem tất cả giao dịch
TOKEN #thông tin xác thực API (Bearer authentication)
ENDPOINT #đường dẫn tới api server, ví dụ: http://localhost:5555
DATA_JSON_PATH #đường dẫn tới PAYLOAD
curl -X POST "$ENDPOINT/api/v1/hotwallet/$ACT" \
     -H "Accept: application/json" \
     -H "Content-Type:application/json" \
     -H "Authorization: Bearer $TOKEN" \
     --data @$DATA_JSON_PATH -vvv

PAYLOAD
#award
{
    "account": "<địa chỉ ví nhận>",
    "amount": <số lượng coin>
}

#balance
{
    "account": "<địa chỉ ví cần kiểm tra>",
}

#charge
{
    "account": "<địa chỉ ví thanh toán>",
    "amount": <số lượng coin>
}

#transactions
{
    "account": "<địa chỉ ví thanh toán>",
}

#create
{}

#transfer
{
    "source": "<địa chỉ ví gửi>",
    "destination": "<địa chỉ ví nhận>",
    "amount": "<số lượng coin>" #-1 toàn bộ số khả dụng trên ví gửi
}

Response: {"status": $STATUS}
STATUS #trạng thái thực thi api, xem thêm STATUS
```

### HOTWALLET CLIENT API
Xem ví dụ: [examples/KogiERC20HotWallet/client](../../examples/KogiERC20HotWallet/client)

Xem demo: [hotwallet-example](http://171.244.21.104/hotwallet-example/)

```bash
ENDPOINT #đường dẫn tới api server, ví dụ: ws://localhost:5555/ws
NAMESPACE #phân biệt hotwallet cho từng loại coin, ví dụ namespace cho cogi coin hotwallet là: cogi_hotwallet
NONCE #nonce hiện tại của tài khoản trên blockchain
DEADLINE #thời gian tồn tại của chữ ký
SIGNATURE #chữ ký chuẩn EIP712 https://eips.ethereum.org/EIPS/eip-712
#đăng ký nhận sự kiện từ api server
wscat $ENDPOINT/ws/$NAMESPACE/subscribe
{"method":"subscribe","params":{"nonce": $NONCE,"deadline": $DEADLINE,"signature": $SIGNATURE}}

#xem số dư tài khoản
wscat $ENDPOINT/ws/$NAMESPACE
{"method":"balance","params":{"nonce": $NONCE,"deadline": $DEADLINE,"signature": $SIGNATURE}}

#xem toàn bộ giao dịch
wscat $ENDPOINT/ws/$NAMESPACE
{"method":"transactions","params":{"nonce": $NONCE,"deadline": $DEADLINE,"signature": $SIGNATURE}}

Response: {"status": $STATUS}
STATUS #trạng thái thực thi api, xem thêm STATUS
```