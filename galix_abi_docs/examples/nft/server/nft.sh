#!/bin/bash
ENDPOINT="http://127.0.0.1:5555"
ACT=$1
TOKEN=$2
TMP=../tmp/$1.tmp
cp $1.json $TMP
sed -i "s/__RAND__/$RANDOM/g" $TMP
curl -X POST "$ENDPOINT/api/v1/nft/$ACT" \
-H "Accept: application/json" \
-H "Content-Type:application/json" \
-H "Authorization: Bearer $TOKEN" \
--data @"$TMP" -vvv
