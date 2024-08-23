#!/bin/bash
#nc -l 5555 &
ACT=$1
DATA=$1.json
ENDPOINT="https://testnet-api.nemoverse.io/galixcity"
TOKEN="nemohotwalletAIzaSyCkuPP5W2F88UiFovIO"
curl -X POST "$ENDPOINT/api/v1/hotwallet/$ACT" \
-H "Accept: application/json" \
-H "Content-Type:application/json" \
-H "Authorization: Bearer $TOKEN" \
--data @$DATA -vvv
