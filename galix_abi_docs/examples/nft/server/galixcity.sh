#!/bin/bash
_CRES=`cat galixcity.credentials.csv`
get_credentials () {
    echo $_CRES | grep $1 | cut -d ',' -f2 | awk '{print $1}'
}
_NAMESPACE=$1
_CRE="$(get_credentials $_NAMESPACE)"

bash nft.sh $2 $_CRE
