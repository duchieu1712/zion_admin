```bash
_ subscribe(<productId>, <amount>) # Đăng ký gói sản phẩm <id> với số lượng <amount>
_ subscribeETH(<productId>, <amount>) # Đăng ký gói sản phẩm <id> với số lượng <amount>, {value: <amount> * product.price}, stakingToken là WETH
_ redeem(<productId>, <subscriptionId>) # Rút token trước hoặc sau kỳ hạn
_ redeemETH(<productId>, <subscriptionId>) # Rút token trước hoặc sau kỳ hạn, stakingToken là WETH

_ viewSubscription(<account>, <productId>, <subscriptionId>) # Xem token reward đã kiếm được từ gói đã mua
# returns (stakingAmount, rewardsAmount, rewardsCurrentAmount, rewardsEarlierAmount)
# stakingAmount: số lượng cogi đã stake
# rewardsAmount: số lượng rewards nhận khi kết thúc kỳ lãi
# rewardsCurrentAmount: số lượng rewards đã kiếm được tới thời điểm hiện tại
# rewardsEarlierAmount: số lượng rewards nhận được nếu redeem trước thời hạn
```
