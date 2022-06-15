#!/usr/bin/env bash

PATH=$(dirname "$0")
DOCKER=/usr/bin/docker
DOCKER_IMAGE_TAG='notice-app'

if [[ ! -f "$DOCKER" ]]; then
  DOCKER=/usr/local/bin/docker
fi

echo  "using $DOCKER"

$DOCKER build -t ${DOCKER_IMAGE_TAG} "${PATH}"