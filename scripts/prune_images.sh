#!/bin/bash
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
. $SCRIPT_DIR/hosting.conf
. $SCRIPT_DIR/utils.sh

checkIbmcloudCli

echo "🔐 Logging into IBMCloud"
ibmcloud login -a $IBMCLOUD_URL --apikey $IBMCLOUD_APIKEY --no-region
echo "🎯 Targetting the correct region and resource group"
ibmcloud target -r $IBMCLOUD_REGION -g $IBMCLOUD_RESOURCE_GROUP
echo "🔐 Logging into the container registry"
ibmcloud cr login

ibmcloud cr retention-run --images 1 $IMAGE_NAMESPACE --force
