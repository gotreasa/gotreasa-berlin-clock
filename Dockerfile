FROM node:24 AS build

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
FROM node:24-alpine

# Update any out of date packages, keeping no package cache in the image.
# The app runs with node directly, so drop the npm CLI the base image ships:
# its bundled dependencies were the bulk of the image's vulnerability findings.
RUN apk upgrade --no-cache \
  && rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

# Copy with ownership and mode set in the same layer, rather than a later
# chown/chmod that would duplicate every file into a second layer.
COPY --from=build --chown=1000:0 --chmod=775 /usr/src/app /usr/src/app

WORKDIR /usr/src/app

# Switch to the node user (uid 1000), by id so the host can resolve it.
USER 1000

# Image start commands, equivalent to `npm run start:app`.
ENV SERVER_PORT=9080
EXPOSE 9080
ENTRYPOINT [ "node" ]
CMD [ "app.js" ]
