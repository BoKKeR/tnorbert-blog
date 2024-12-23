#!/bin/bash

# Usage: ./replace_env_vars.sh /path/to/folder .env

# Check if the required arguments are provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <folder_path> <env_file>"
  exit 1
fi

FOLDER_PATH="$1"
ENV_FILE="$2"

# Check if the folder exists
if [ ! -d "$FOLDER_PATH" ]; then
  echo "Error: Folder '$FOLDER_PATH' does not exist."
  exit 1
fi

# Check if the .env file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "Error: File '$ENV_FILE' does not exist."
  exit 1
fi

# Export variables from the .env file but only if they are not already set
while IFS='=' read -r VAR_NAME VAR_VALUE; do
  # Skip empty lines and comments
  if [[ -z "$VAR_NAME" || "$VAR_NAME" =~ ^# ]]; then
    continue
  fi

  # Trim whitespace
  VAR_NAME="$(echo -e "${VAR_NAME}" | tr -d '[:space:]')"
  VAR_VALUE="$(echo -e "${VAR_VALUE}" | tr -d '[:space:]')"

  # Only export the variable if it's not already set
  if [ -z "${!VAR_NAME}" ]; then
    export "$VAR_NAME"="$VAR_VALUE"
  fi
done <"$ENV_FILE"

# Iterate over each variable in the .env file
while IFS='=' read -r VAR_NAME _; do
  # Skip empty lines and comments
  if [[ -z "$VAR_NAME" || "$VAR_NAME" =~ ^# ]]; then
    continue
  fi

  # Trim whitespace
  VAR_NAME="$(echo -e "${VAR_NAME}" | tr -d '[:space:]')"

  # Get the value from the current environment
  VAR_VALUE="${!VAR_NAME}"

  # If the variable is not set in the environment, skip it
  if [ -z "$VAR_VALUE" ]; then
    echo "Warning: Environment variable '$VAR_NAME' is not set. Skipping."
    continue
  fi

  echo "Replacing occurrences of '$VAR_NAME' with its value in the environment."

  # Recursively replace occurrences of the variable in all files within the folder
  grep -rl "$VAR_NAME" "$FOLDER_PATH" | xargs sed -i '' "s|$VAR_NAME|$VAR_VALUE|g"
done <"$ENV_FILE"

echo "Replacement complete."
