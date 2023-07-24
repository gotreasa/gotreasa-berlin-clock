#!/bin/bash

function checkIbmcloudCli() {
  # IBM Cloud API Setup & Login
  if ! [ -x "$(command -v ibmcloud)" ]; then
    echo 'IBM Cloud CLI is not installed. Installing...' >&2
    curl -sL https://ibm.biz/idt-installer | bash
    ibmcloud plugin install code-engine
  fi
}
