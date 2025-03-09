#!/bin/bash
if [ "$*" = "--no-tests" ]
then
    echo "Skipping tests..."
else
    uv run coverage run -m pytest -vv $@
fi

uv run mypy --explicit-package-base .
uv run ruff check . --no-cache
uv run coverage html
uv run ruff format .