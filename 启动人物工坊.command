#!/bin/zsh
set -eu
cd "$(dirname "$0")"
exec /usr/bin/env node server.mjs
