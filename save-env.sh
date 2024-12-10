#!/bin/bash

# Create .env file with all environment variables
echo "Creating .env file from current environment variables..."
env | while IFS='=' read -r key value; do
  # Escape any special characters in the value
  escaped_value=$(printf '%s' "$value" | sed 's/"/\\"/g')
  echo "${key}=\"${escaped_value}\""
done >.env

# Check if .env was created successfully
if [ $? -ne 0 ]; then
  echo "Failed to create .env file."
  exit 1
fi

echo ".env file created successfully."
