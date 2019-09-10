#!/bin/sh
npm run build && npm run start
exec "$@"
