#!/bin/bash

# Set the PYTHONPATH environment variable
export PYTHONPATH=/workspaces/fluxbuild/backend
uv run fastapi dev api/app.py
