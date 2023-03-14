#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
if [[ "${TRACE-0}" == "1" ]]; then
  set -o xtrace
fi

if [[ "${1-}" =~ ^-*h(elp)?$ ]]; then
  echo 'Usage: ./setup.sh

Setup dependencies for local development

'
  exit
fi

cd "$(dirname "$0")/.."

ensure_deps() {
  if ! command -v node &>/dev/null; then
    echo "Long Haul Fitness Exercises requires 'node'. Please install it."
  fi
}

setup_node() {
  npm install
}

main() {
  ensure_deps "$@"
  setup_node "$@"
}

main "$@"
