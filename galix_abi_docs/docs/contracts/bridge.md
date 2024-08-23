### Bridge smartcontract
```php
# Gửi token ERC20 vào bridge, cần gọi approve trước khi gửi token
sendERC20(address _token, uint256 _chainId, address _to, uint256 _amount)
_token token gửi đến bridge
_chainId blockchain id nhận token
_to địa chỉ ví nhận token
_amount số lượng token, phải nhỏ hơn maxInWei

# Nhận token ERC20 từ bridge, sử dụng khi nhận ERC20 token
receiveERC20(address _token, address _receiver, string memory _txhash, uint256 _amount, bytes[] calldata _signature)
_token token nhận từ bridge
_receiver địa chỉ ví nhận token
_txhash transaction hash nhận được từ sendERC20 hoặc sendETH
_amount số lượng token
_signature chữ ký nhận được từ Bridge Validator

# Gửi native token vào  bridge, {value: amount ether}
sendETH(uint256 _chainId, address _to)
_chainId blockchain id nhận token
_to địa chỉ ví nhận token

# Nhận token ETH từ bridge, sử dụng khi nhận ETH token
receiveETH(address _receiver, string memory _txhash, uint256 _amount, bytes[] calldata _signature)
_receiver địa chỉ ví nhận token
_txhash transaction hash nhận được từ sendERC20 hoặc sendETH
_amount số lượng token
_signature chữ ký nhận được từ Bridge Validator