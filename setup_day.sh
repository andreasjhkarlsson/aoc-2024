#!/bin/bash

# Check if a number is provided as an argument
if [ -z "$1" ]; then
    echo "Usage: $0 <number>"
    exit 1
fi

# Get the number argument
DAY_NUMBER=$1

# Format the number to ensure zero padding (e.g., 01, 02)
DAY_NUMBER_PADDED=$(printf "%02d" "$DAY_NUMBER")

# Define file paths
SRC_FILE="src/day${DAY_NUMBER_PADDED}.ts"
SAMPLE_INPUT_FILE="data/day${DAY_NUMBER_PADDED}.sample.input"
INPUT_FILE="data/day${DAY_NUMBER_PADDED}.input"

# Create the files and directories if they don't exist
mkdir -p src data

touch "$SRC_FILE" "$SAMPLE_INPUT_FILE" "$INPUT_FILE"

# Provide feedback
echo "Created files:"
echo "  $SRC_FILE"
echo "  $SAMPLE_INPUT_FILE"
echo "  $INPUT_FILE"