#!/bin/bash

# Load environment variables from the .env file
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
else
  echo ".env file not found!"
  exit 1
fi

# Ensure required variables are set
if [ -z "$REMOTE_DATABASE_URI" ] || [ -z "$DATABASE_URI" ]; then
  echo "One or more required variables are missing in the .env file."
  exit 1
fi

# Path for dumping temporary files
DUMP_PATH="./mongo_backup"

# Clean up previous dumps if any
rm -rf $DUMP_PATH

# Step 1: Wipe the local MongoDB database
echo "Wiping local MongoDB database..."
mongosh "${DATABASE_URI}" --eval "db.getSiblingDB('tnorbert-blog').dropDatabase()"

# Step 1: Dump the remote MongoDB collection
echo "Dumping remote MongoDB collection..."
mongodump --uri="${REMOTE_DATABASE_URI}" --out="${DUMP_PATH}"

if [ $? -ne 0 ]; then
  echo "Failed to dump remote MongoDB collection."
  exit 1
fi

# Step 2: Restore the dump to the local MongoDB collection
# Step 3: Restore all collections to the local MongoDB database
echo "Restoring dump to local MongoDB..."
echo $DUMP_PATH
# Get all BSON files from the dump and restore them using nsInclude
for collection in $(find "$DUMP_PATH" -name "*.bson" | sed "s|$DUMP_PATH/[^/]*\/||;s|\.bson$||"); do
  # Restore each collection using the --nsInclude flag
  # echo "${DUMP_PATH}/test/${collection}.bson"

  mongorestore --uri="${DATABASE_URI}" --nsInclude="tnorbert-blog.${collection}" "${DUMP_PATH}/tnorbert-blog/${collection}.bson"

  if [ $? -ne 0 ]; then
    echo "Failed to restore collection ${collection} to local MongoDB."
  else
    echo "Successfully restored collection ${collection}."
  fi
done

if [ $? -ne 0 ]; then
  echo "Failed to restore to local MongoDB."
  exit 1
fi

# Cleanup
rm -rf $DUMP_PATH

echo "Data successfully copied from remote MongoDB to local MongoDB!"

scp root@10.0.0.168:/mnt/disks/un_nvme/kubernetes/tnorbert-blog/\*.{jpeg,png,jpeg} ./media
echo "Images sucessfully downloaded"
