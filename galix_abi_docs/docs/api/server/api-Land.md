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
Open Sell and Buy LAND: #NFT_REQUEST_MINT_CID_WAIT > NFT_REQUEST_MINT_DAPP_WAIT > NFT_REQUEST_MINT_TX_SUBMIT_WAIT > NFT_REQUEST_MINT_TX_CONFIRM_WAIT > TX_SUCCESS

NFT_MINT_CID_WAIT: 7 #Chờ tạo CID từ IPFS
TX_SUBMIT_WAIT: #Chờ gửi transaction tạo NFT tới blockchain
TX_CONFIRM_WAIT: #Chờ kết quả transaction tạo NFT từ blockchain
TX_SUCCESS: #Tạo NFT thành công
NFT_MINT_CID_FAILED: #Tạo CID từ IPFS thất bại
NFT_MINT_FAILED: #Tạo NFT thất bại


# Mở Đóng bán Land cho người dùng Mint
NFT_REQUEST_MINT_CID_WAIT: 6 #Chờ tạo CID từ IPFS
NFT_REQUEST_MINT_DAPP_WAIT: 5 # Đã tạo CID thành công ->  Chờ Gọi để tạo transaction convert thành NFT ( Mở Bán Land)
# NFT_REQUEST_MINT_TX_SUBMIT_WAIT: #Chờ marketplace gửi transaction tạo NFT tới blockchain
# NFT_REQUEST_MINT_TX_CONFIRM_WAIT: #Chờ kết quả transaction tạo NFT từ blockchain
TX_SUCCESS: #Tạo NFT thành công

NFT_REQUEST_MINT_DAPP_CANCELED: -5 #Hủy Convert thành NFT -> Đóng bán Land

NFT_REQUEST_MINT_CID_FAILED: -6 #Tạo CID từ IPFS thất bại -> Lúc này Land không thể convert thành NFT
NFT_REQUEST_MINT_FAILED: #Tạo NFT thất bại

UPGRADE_LAND : 15 # Upgrade Land thành công
```


## CALLBACK
Hỗ trợ http callback và RPC

```bash
# NFT_REQUEST_MINT_CID_FAILED, NFT_REQUEST_MINT_DAPP_CANCELED
{
    "status": <ENUM>,
    "uuid": <request uuid>,
    "namespace": <request namespace>,
    "params": {
        "owner": <nft owner>,
        "cid": <ipfs cid>,
        "address": <nft contract address>
    }
}

# NFT_REQUEST_MINT_DAPP_WAIT
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
# LAND TX_SUCCESS, BURNED
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
        "landLV": <land Level>
    }
}
```

```bash
# LAND TRANSFER
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

#LAND UPGRADE_LAND
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
        "landLV": <new Land Level>,
        "landid": <Land ID>

    }
}
```

### API REQUEST_MINTS
# Mở bán Land
GameServer
```bash
TOKEN #thông tin xác thực API (Bearer authentication)
ENDPOINT #đường dẫn tới api server, ví dụ: http://localhost:5555
DATA_JSON_PATH #đường dẫn tới file LANDs metadata,
curl -X POST "$ENDPOINT/api/v1/land/request_mints" \
     -H "Accept: application/json" \
     -H "Content-Type:application/json" \
     -H "Authorization: Bearer $TOKEN" \
     --data @$DATA_JSON_PATH -vvv

Response: [{'landid':$LAND_ID, 'uuid': $UUID,   "status": $STATUS}]
STATUS #Trạng thái request mint LAND, xem thêm STATUS
LAND_ID #ID của LAND, xem thêm STATUS
UUID #UUID item able LAND
```
# Đóng bán Land
```bash
TOKEN #thông tin xác thực API (Bearer authentication)
ENDPOINT #đường dẫn tới api server, ví dụ: http://localhost:5555
DATA_JSON_PATH #đường dẫn tới file chứa List Cid của Land
curl -X POST "$ENDPOINT/api/v1/land/request_cancelbuys" \
     -H "Accept: application/json" \
     -H "Content-Type:application/json" \
     -H "Authorization: Bearer $TOKEN" \
     --data @$DATA_JSON_PATH -vvv

Response: [{'cid': $CID,   "status": $STATUS}]
STATUS #Trạng thái request cancel LAND, xem thêm STATUS
CID #ipfs cid của LAND
