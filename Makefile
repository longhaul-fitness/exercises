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
	rm -rf node_modules out
.PHONY: clean

format: out/.format.prettier.sentinel
.PHONY: format

lint: out/.lint.strength.sentinel out/.lint.cardio.sentinel
.PHONY: lint

############
# Sentinels
############

out/.format.prettier.sentinel: $(shell find ./ -type f \( -iname \*.md -o -iname \*.json \))
	npm run format
	mkdir -p $(@D)
	touch $@

out/.lint.strength.sentinel: strength.json schema-strength.json
	boon schema-strength.json strength.json
	mkdir -p $(@D)
	touch $@

out/.lint.cardio.sentinel: cardio.json schema-cardio.json
	boon schema-cardio.json cardio.json
	mkdir -p $(@D)
	touch $@
