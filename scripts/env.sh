#!/bin/bash
SERVER_PORT=8888
CLIENT_ID=""
CLIENT_SECRET=""
SCOPE="user-read-private user-read-email"
REDIRECT_TO_CALLBACK=""
REDIRECT_TO_WEB_APP=""
STATE_KEY=""
NODE_ENV="development"
DIRECTORY=$(pwd)

rm -rf "$DIRECTORY/.env"

echo "Creating Development Environment Variables"

cat > "$DIRECTORY/.env" <<- EOM
SERVER_PORT=${SERVER_PORT}
CLIENT_ID=${CLIENT_ID}
CLIENT_SECRET=${CLIENT_SECRET}
SCOPE=${SCOPE}
REDIRECT_TO_CALLBACK=${REDIRECT_TO_CALLBACK}
REDIRECT_TO_WEB_APP=${REDIRECT_TO_WEB_APP}
STATE_KEY=${STATE_KEY}
EOM

echo "Development environment variables created successfully at '${DIRECTORY}'."