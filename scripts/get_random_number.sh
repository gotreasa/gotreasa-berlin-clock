#!/bin/sh

echo $(($RANDOM % (65535 - 3000 + 1) + 3000))