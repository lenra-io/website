#!/bin/bash

envsubst '${GHORGAMEL_URL}' < /opt/bitnami/nginx/conf/server_blocks/nginx.conf.template > /opt/bitnami/nginx/conf/server_blocks/nginx.conf

. /opt/bitnami/scripts/nginx/entrypoint.sh "$@"
