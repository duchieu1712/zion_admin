```bash
 rent(<tokenId>) # stake land
 claim(<tokenId>) # claim phần thưởng sau mỗi cliff timestamp
 prepareRecall(<tokenId>) #thông báo thu hồi land, có thể thu hồi sau <1 ngày> thông báo
 recall(<tokenId>) # thu hồi land và claim phần thưởng, chỉ được thu hồi khi đã thông báo thu hồi land
 available(<tokenId>) # phần thưởng có sẵn của tokenId
```

### Thông tin smartcontract trên fuji testnet
```bash
ABI: GalixERC721LandRent
Smartcontract address: 0x6F5fc826f29362E7385Ad8749532301dDA0d7703

```