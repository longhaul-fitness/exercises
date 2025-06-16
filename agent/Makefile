SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

###############
# Entry points
###############
format: out/.format.python.sentinel
.PHONY: format

lint: out/.lint.python.sentinel
.PHONY: lint

outdated:
	uv pip list --outdated
.PHONY: outdated

update:
	uv lock --upgrade
.PHONY: update

############
# Sentinels
############

out/.format.python.sentinel: $(shell find ./ -name "*.py" -type f)
	.venv/bin/ruff check --fix ./
	.venv/bin/black ./
	.venv/bin/isort ./
	mkdir -p $(@D)
	touch $@

out/.lint.python.sentinel: $(shell find ./ -name "*.py" -type f)
	.venv/bin/ruff check ./
	.venv/bin/ty check ./
	mkdir -p $(@D)
	touch $@
