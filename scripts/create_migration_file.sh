#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 <string>"
    exit 1
fi

input_string="$1"
timestamp=$(date +"%Y%m%d%H%M%S")
filename="${timestamp}_${input_string}.ts"
output_path="./src/database/migrations/$filename"

echo "Creating file: $output_path"
touch "$output_path"
echo "Empty migration file created: $output_path"

echo "Inputting templates"

cat > $output_path <<EOF
import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}
EOF