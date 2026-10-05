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
      should match (
                     %r{COPY --from=build --chown=1000:0 --chmod=775 /usr/src/app /usr/src/app}
                   )
    end
    its("content") { should match (/USER 1000/) }
    its("content") { should match (/RUN apk upgrade --no-cache/) }
    its("content") do
      should match (
                     %r{rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx}
                   )
    end
    its("content") { should match (/ENV SERVER_PORT=9080/) }
    its("content") { should match (/EXPOSE 9080/) }
    its("content") { should match (/ENTRYPOINT \[ \"node\" \]/) }
    its("content") { should match (/CMD \[ \"app.js\" \]/) }
  end
end
