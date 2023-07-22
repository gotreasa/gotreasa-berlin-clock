# Technical Debt

- ✅ TD1 Change the allowed time format to be [0-23]:[0-59]:[0-59] to be consistent with the Open API specification
- ✅ TD2 Move the extraction of the numbers from the time into a specific file
- ✅ TD 3 Set up the Github action for testing the container structure
- ✅ TD 4 Set up container structure tests for the local pipeline
- ⚠ TD 5 Change the npm test to be able to run all of the tests in parallel
- ⚠ TD 6 change the build of the image so that there are tests before it is pushed - https://docs.docker.com/build/ci/github-actions/test-before-push/
- ⚠ TD 7 Setup caching on the pipeline - https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows
- ⚠ TD 8 Fix the code for the error pactBrokerUrl requires one of the following properties: pactUrls,consumerVersionSelectors,consumerVersionTags
