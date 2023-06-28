control 'docker-compose.yml' do
  title 'Inspect docker compose file'

  describe file('docker-compose.yml') do
    its('content') { should match (/version: '3.5'/) }
    its('content') { should match (/gotreasa-berlin-clock:/) }
    its('content') { should match (/image: gotreasa-berlin-clock/) }
    its('content') { should match (/container_name: gotreasa-berlin-clock/) }
    its('content') { should match (/context: \./) }
    its('content') { should match (%r{dockerfile: \./Dockerfile}) }
    its('content') { should match (/environment:\n\s*NODE_ENV: production/) }
    its('content') { should match (/ports:\n\s*- 9080:9080/) }
  end
end
