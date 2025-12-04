title "Check Tests"

control "compose.yml" do
  title "Inspect docker compose file"

  describe file("compose.yml") do
    its("content") { should match (/gotreasa-berlin-clock:/) }
    its("content") { should match (/container_name: gotreasa-berlin-clock/) }
    its("content") { should match (/context: \./) }
    its("content") { should match (%r{dockerfile: \./Dockerfile}) }
    its("content") { should match (/environment:\n\s*NODE_ENV: production/) }
    its("content") { should match (/ports:\n\s*- 9080:9080/) }
  end
end
