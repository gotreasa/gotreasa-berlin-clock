control "Dockerfile" do
  title "Inspect dockerfile"

  describe file("Dockerfile") do
    its("content") { should match (/node:24/) }
    its("content") { should match (%r{COPY package\*.json ./}) }
    its("content") do
      should match (
                     %r{RUN npm ci --omit=dev --ignore-scripts && npm prune --omit=dev && /usr/local/bin/node-prune}
                   )
    end
    its("content") { should match (%r{COPY app.js ./}) }
    its("content") { should match (%r{COPY openapi.json ./}) }
    its("content") { should match (/COPY src src/) }
    its("content") do
      should match (%r{COPY test/container/integration/goss.yaml goss.yaml})
    end
    its("content") { should match (/node:24-alpine/) }
    its("content") { should match (%r{WORKDIR /usr/src/app}) }
    its("content") do
      should match (%r{COPY --from=build /usr/src/app /usr/src/app})
    end
    its("content") do
      should match (
                     %r{RUN chown -R node:root /usr/src/app/ && chmod -R 775 /usr/src/app/}
                   )
    end
    its("content") { should match (/USER node/) }
    its("content") do
      should match (
                     /apk add --no-cache --virtual=goss-dependencies curl=8.14.1-r2 ca-certificates=20250911-r0/
                   )
    end
    its("content") { should match (/EXPOSE 9080/) }
    its("content") { should match (/ENTRYPOINT \[ \"npm\" \]/) }
    its("content") { should match (/CMD \[ \"run\", \"start:app\" \]/) }
  end
end
