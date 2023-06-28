control 'Dockerfile' do
  title 'Inspect dockerfile'

  describe file('Dockerfile') do
    its('content') { should match (/node:18/) }
  end
end
