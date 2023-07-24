#!/bin/bash
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
. $SCRIPT_DIR/hosting.conf
. $SCRIPT_DIR/utils.sh

echo "This will delete the entire project for $APP_NAME."
echo "If you're certain enter 'delete', otherwise the process will be cancelled."
read input
if [ "$input" != "delete" ]; then
  echo -e "✋ Aborting the process!\n"
  exit 0
fi

checkIbmcloudCli

echo "🔐 Logging into IBMCloud"
ibmcloud login -a $IBMCLOUD_URL --apikey $IBMCLOUD_APIKEY --no-region
echo "🎯 Targetting the correct region and resource group"
ibmcloud target -r $IBMCLOUD_REGION -g $IBMCLOUD_RESOURCE_GROUP
echo "🔐 Logging into the container registry"
ibmcloud cr login

ibmcloud cr namespace-rm $IMAGE_NAMESPACE --force

ibmcloud ce project delete --name $PROJECT_NAME --hard --force

echo "🏁 Finished deleting the project"
