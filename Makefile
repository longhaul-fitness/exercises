SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

###############
# Entry points
###############
setup:
	./scripts/setup.sh
.PHONY: setup

dev:
	npm run dev
.PHONY: dev

clean:
	rm -rf node_modules
.PHONY: clean
