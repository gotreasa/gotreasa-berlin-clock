control 'Dockerfile' do
  title 'Inspect dockerfile'

  describe file('Dockerfile') do
    its('content') { should match (/node:18/) }
    its('content') { should match (%r{COPY package\*.json ./}) }
    its('content') { should match (/RUN npm ci --omit=dev --ignore-scripts/) }
    its('content') do
      should match (%r{RUN npm prune && /usr/local/bin/node-prune})
    end
    its('content') { should match (%r{COPY app.js ./}) }
    its('content') { should match (%r{COPY openapi.json ./}) }
    its('content') { should match (/COPY src src/) }
    its('content') { should match (/node:18-alpine/) }
    its('content') { should match (%r{WORKDIR /usr/src/app}) }
    its('content') do
      should match (%r{COPY --from=BUILD /usr/src/app /usr/src/app})
    end
    its('content') do
      should match (
                     %r{RUN chown -R node:root /usr/src/app/ && chmod -R 775 /usr/src/app/}
                   )
    end
    its('content') { should match (/USER node/) }
    its('content') { should match (/EXPOSE 9080/) }
    its('content') { should match (/ENTRYPOINT \[ \"npm\" \]/) }
    its('content') { should match (/CMD \[ \"run\", \"start:app\" \]/) }
  end
end