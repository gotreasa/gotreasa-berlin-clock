FROM node:25 AS build

WORKDIR /usr/src/app

# Add pruning packages for use later.
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

COPY package*.json ./

# Install the production packages and then prune the source code
RUN npm ci --omit=dev --ignore-scripts && npm prune --omit=dev && /usr/local/bin/node-prune

COPY app.js ./
COPY openapi.json ./
COPY src src
COPY test/container/integration/goss.yaml goss.yaml

# Build final image using small base image.
FROM node:25-alpine

# Update any out of date packages
RUN apk update && apk upgrade

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

# Set permissions for node app folder after copy.
RUN chown -R node:root /usr/src/app/ && chmod -R 775 /usr/src/app/

# Temporary fix
RUN rm -rf /usr/local/lib/node_modules/npm/node_modules/cross-spawn/

# Switch to node user.
USER node

# Image start commands.
EXPOSE 9080
ENTRYPOINT [ "npm" ]
CMD [ "run", "start:app" ]
