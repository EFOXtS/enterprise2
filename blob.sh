#!/bin/bash

BLOB_FILE="style-blob.txt"
CURRENT_FILE=""

echo "Reading blob from $BLOB_FILE"

while IFS= read -r line || [ -n "$line" ]; do
  # Check if it's a marker for a new file
  if [[ "$line" == ---*--- ]]; then
    # Extract filename
    CURRENT_FILE=$(echo "$line" | sed 's/---//g' | xargs)
    echo "Creating: $CURRENT_FILE"
    mkdir -p "$(dirname "$CURRENT_FILE")"
    > "$CURRENT_FILE"
  else
    # Only append if we have an open file
    if [[ -n "$CURRENT_FILE" ]]; then
      echo "$line" >> "$CURRENT_FILE"
    fi
  fi
done < "$BLOB_FILE"

echo "✅ Split complete!"
