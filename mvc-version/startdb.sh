#!/bin/bash

export MSYS_NO_PATHCONV=0

docker-compose up -d --build

sleep 5

docker exec mongo1 /scripts/rs-init.sh