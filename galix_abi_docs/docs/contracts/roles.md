```bash
 hasRole(<role>, <account>) return boolean # Kiểm tra <account> có được cấp <role>
 getRoleAdmin(<role>) return bytes32 # Lấy role admin của <role>
 grantRole(<role>, <account>) # Cấp <role> cho <account>
 revokeRole(<role>, <account>) # Thu hồi <role> của <account>
 getMemberRole(<account>, <index>) return bytes32 # Lấy role của <account> ở <index>
 getMemberRoleCount(<account>) return uint256 # Lấy số role <account> đã đươc cấp
 getRoleMember(<role>, <index>) return address # Lấy account của <role> ở <index>
 getRoleMemberCount(<role>) return uint256 # Lấy số account đã được cấp <role>
```


### Thông tin smartcontract trên fuji testnet
```bash
ABI: GalixAccessControl
Smartcontract address: 0x2Cb294dF1679b1447F15bba8E05Da6076D5920ec

```