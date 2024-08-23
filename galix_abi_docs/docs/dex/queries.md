# Total liquidity
```script
{
  uniswapFactories {
    totalLiquidityUSD
    txCount
  }
}
```

# Daily volume
```script
{
  uniswapDayDatas(orderBy: date, orderDirection: desc) {
    date
    dailyVolumeUSD
    totalLiquidityUSD
  }
}
```

# 24 hours volume
```script
{
  pairHourDatas(orderBy: hourStartUnix, orderDirection: desc) {
    hourStartUnix
    hourlyVolumeUSD
  }
}
```


# Top pairs by liquidity
```script
{
  pairs(orderBy: reserveUSD, orderDirection: desc) {
    id
    reserveUSD
    token0 {
      symbol
    }
    token1 {
      symbol
    }
  }
}
```

# Daily volume of a pair (for each pair)
```script
{
  pairDayDatas(
    where: {pairAddress: "0x21b8065d10f73ee2e260e5b47d3344d3ced7596e"}
    orderBy: date
    orderDirection: desc
  ) {
    date
    dailyVolumeUSD
  }
}
```

# Latest transaction
```script
{
  transactions(orderBy: timestamp, orderDirection: desc) {
    burns {
      amount0
      amount1
      amountUSD
      feeLiquidity
      sender
      timestamp
      pair {
        id
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
    }
    mints {
      amount0
      amount1
      amountUSD
      feeLiquidity
      sender
      timestamp
      pair {
        id
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
    }
    swaps {
      amount0In
      amount0Out
      amount1In
      amount1Out
      amountUSD
      sender
      
      pair {
        id
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
    }
    id
  }
}


{
  swaps/burns/mints {
    amount0In
    amount0Out
    amount1In
    amount1Out
    amountUSD
    sender
    pair {
      id
      token0 {
        symbol
        id
      }
      token1 {
        symbol
        id
      }
      volumeUSD
      volumeToken0
      volumeToken1
    }
    timestamp
  }
}
```



# Top Pools
```script
{
  pairs(orderBy: reserveUSD, orderDirection: desc, where: {}) {
    id
    reserveUSD
    token0 {
      symbol
    }
    token1 {
      symbol
    }
    volumeUSD
    reserve0
    reserve1
  }
}
```


# Top users pool
```script
{
  users(where: {id_not: "", id: "0x0000000000000000000000000000000000000001"}) {
    id
    liquidityPositions(orderBy: liquidityTokenBalance, orderDirection: desc) {
      pair {
        reserve0
        reserve1
        reserveUSD
        volumeUSD
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
        volumeToken0
        volumeToken1
      }
      liquidityTokenBalance
    }
  }
}
```