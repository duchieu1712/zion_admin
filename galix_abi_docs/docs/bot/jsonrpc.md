### SIG

Sử dụng personal_sign

```bash
SIGNATURE #chữ ký
MESSAGE

#personal_sign
{"message": $MESSAGE,"signature": $SIGNATURE}
```

### JSONRPC

```bash
ID #id RPC
ENDPOINT #đường dẫn tới api server, ví dụ: ws://localhost:45555/ws
SIG #chữ ký
PRICE #Giá
MIN_PRICE, MAX_PRICE #giới hạn giá

#Thiết lập giá NEMO trên P2P
wscat $ENDPOINT/jsonrpc
{"jsonrpc":"2.0","id":$ID,"method":"set_price","params":[$SIG, $PRICE]}

[{"jsonrpc": "2.0", "result": {}}]

#Lấy giá đề xuất từ bot
{"jsonrpc":"2.0","id":$ID,"method":"price_range","params":[$SIG]}

#Lấy thông tin config
{"jsonrpc":"2.0","id": 1, "method":"dump_config","params":[$SIG]}

#Lấy thông tin roles
{"jsonrpc":"2.0","id": 1, "method":"dump_roles","params":[$SIG]}

#Cập nhật config
{"jsonrpc":"2.0","id": 1, "method":"set_config","params":[$SIG, "priceImpact", "1000"]}
{"jsonrpc":"2.0","id": 1, "method":"set_config","params":[$SIG, "telegramBot", {"token": "5222003565:AAEddXWgnXeueHCs7EbF9xb2NJiRjBoyacQ", "chatId": "-672265468"}]}
```
