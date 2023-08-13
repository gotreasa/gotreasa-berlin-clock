# Changelog

## [0.2.7](https://github.com/gotreasa/gotreasa-berlin-clock/compare/0.2.6...0.2.7) (2023-08-13)

## [0.2.6](https://github.com/gotreasa/gotreasa-berlin-clock/compare/0.2.5...0.2.6) (2023-08-12)

### Reverts

- move back from dev in the docker and okteto files ([781b11b](https://github.com/gotreasa/gotreasa-berlin-clock/commit/781b11bf0648538ce1b5cfc07520b869bb07afda))
- remove the namespace ([f52a7c5](https://github.com/gotreasa/gotreasa-berlin-clock/commit/f52a7c5fc4c05e01ac73f717539e47beeda05363))
- rename the okteto file again along with the workflows where they are used ([ce09c28](https://github.com/gotreasa/gotreasa-berlin-clock/commit/ce09c2861ac0611d8077884d7075943782c73cad))

## [0.2.5](https://github.com/gotreasa/gotreasa-berlin-clock/compare/0.2.4...0.2.5) (2023-08-12)

## [0.2.4](https://github.com/gotreasa/gotreasa-berlin-clock/compare/0.2.3...0.2.4) (2023-08-12)

## [0.2.3](https://github.com/gotreasa/gotreasa-berlin-clock/compare/0.2.2...0.2.3) (2023-08-12)

## [0.2.2](https://github.com/gotreasa/gotreasa-berlin-clock/compare/0.2.1...0.2.2) (2023-08-12)

## [0.2.1](https://github.com/gotreasa/gotreasa-berlin-clock/compare/0.2.0...0.2.1) (2023-08-12)

## [0.2.0](https://github.com/gotreasa/gotreasa-berlin-clock/compare/0.1.1...0.2.0) (2023-08-12)

### Features

- enable csrf and cors ([0e1b70d](https://github.com/gotreasa/gotreasa-berlin-clock/commit/0e1b70dfe75881dde0c2ca9fc2d053fac53dd6b7))
- enable rate limiting for the health endpoint ([625f92a](https://github.com/gotreasa/gotreasa-berlin-clock/commit/625f92add85ed422b46a1b65b3f192301d92c704))

### Bug Fixes

- add cors options ([5f8cb1f](https://github.com/gotreasa/gotreasa-berlin-clock/commit/5f8cb1f3b115566d58af2bca75f3e968371374b9))
- add the missing checkout for running the dastardly report ([ac83c74](https://github.com/gotreasa/gotreasa-berlin-clock/commit/ac83c7482fee9eb1d4f0af65a7bdd14c79f2a5d7))
- add the missing checout for running the dastardly report ([67f5afc](https://github.com/gotreasa/gotreasa-berlin-clock/commit/67f5afcaf2fcc9a04796ad6549334f493bf811b5))
- remove run infront of the npm ci command ([0a7a17c](https://github.com/gotreasa/gotreasa-berlin-clock/commit/0a7a17cb26519aa8febe3bc411f17907af21ef2b))
- remove the cors integration on the api-docs endpoint ([298e4ae](https://github.com/gotreasa/gotreasa-berlin-clock/commit/298e4ae342d1b31e0343368d06e86ec637c512e5))
- simplifying the secure cookie configuration ([24af311](https://github.com/gotreasa/gotreasa-berlin-clock/commit/24af3110472496ec38f35c4159c3d46004232922))
- sort out missing timestamp.json ([116b533](https://github.com/gotreasa/gotreasa-berlin-clock/commit/116b533cd60e2458414c89b7f0832293faf84435))
- update the ESLint output to be in JSON format ([828772d](https://github.com/gotreasa/gotreasa-berlin-clock/commit/828772d81bec327a820358cdfcf1d9c71671dc2c))
- update the snyk testing to work correctly with container and publishing ([1f81c5e](https://github.com/gotreasa/gotreasa-berlin-clock/commit/1f81c5eb31d439a766a51581821d66df6198d46d))

### Reverts

- go to one proxy level ([dc059a1](https://github.com/gotreasa/gotreasa-berlin-clock/commit/dc059a12ff4c774da54873584781f60fe8ea6ade))
- moving back to the api-docs to do the DAST testing ([812c63c](https://github.com/gotreasa/gotreasa-berlin-clock/commit/812c63c3123e6df449523df303d89fce709e66cf))
- remove redundant upload of results from the Snyk monitor ([35ec369](https://github.com/gotreasa/gotreasa-berlin-clock/commit/35ec3691a974c48dfb8d45adb54e16a57bc547e6))
- remove the code depending on the timestamp.json ([916e632](https://github.com/gotreasa/gotreasa-berlin-clock/commit/916e63289409ebe0996f24e57ff1ccda753d21f6))
- rollback all of the AWS code ([c9bd595](https://github.com/gotreasa/gotreasa-berlin-clock/commit/c9bd595f4086e08c4639c191b9701000eea30f2f))
- switch grype back to use sarif for the output ([4a3b3af](https://github.com/gotreasa/gotreasa-berlin-clock/commit/4a3b3aff73bd77ea95ccd97bfe5c1801618502f0))

## [0.1.1](https://github.com/gotreasa/gotreasa-berlin-clock/compare/0.1.0...0.1.1) (2023-08-09)

## 0.1.0 (2023-08-08)

### Features

- add working container structure tests ([a81ec53](https://github.com/gotreasa/gotreasa-berlin-clock/commit/a81ec53b55deca1047c82da0824c1df6144daabb))
- handle bad input ([d8c3be8](https://github.com/gotreasa/gotreasa-berlin-clock/commit/d8c3be83f46e5eeca257d0a9197b2949242ebad5))
- handle even seconds by default ([5ef6aff](https://github.com/gotreasa/gotreasa-berlin-clock/commit/5ef6aff29c2b607de35448d12431b1e7709ed06a))
- handle odd seconds ([89cfbcc](https://github.com/gotreasa/gotreasa-berlin-clock/commit/89cfbcca9c9b0ef4218bc31de497618f2a5023df))
- handle single five hours for UAT 1.4 ([47e5ad6](https://github.com/gotreasa/gotreasa-berlin-clock/commit/47e5ad6d4bdc8db7f73ea6aa16cf1bfad0a4f1b9))
- handle single minutes for UAT 1.5 ([2ceaafb](https://github.com/gotreasa/gotreasa-berlin-clock/commit/2ceaafb5a1df7ade6b5941d4162ee0b86580b1fa))
- handle the multiple of five hours on the first row ([200e9a3](https://github.com/gotreasa/gotreasa-berlin-clock/commit/200e9a3f21743d85ff8213077f4de51eeedc12d6))
- handle the third row of lights denoting five minutes ([ec65905](https://github.com/gotreasa/gotreasa-berlin-clock/commit/ec65905bfc7df1f8ea60b400a20636a6f8b18604))
- integrate the Goss checks into the /health endpoint ([40a41d7](https://github.com/gotreasa/gotreasa-berlin-clock/commit/40a41d7debe8b2eb192ddef6d9032ccb050d67b8))
- return Y when an even second by default ([178fe01](https://github.com/gotreasa/gotreasa-berlin-clock/commit/178fe01c5a8109f429ba48cd033dd03837aa9e8e))
- set up a script to destroy the entire IBM Cloud app that was deployed ([439e424](https://github.com/gotreasa/gotreasa-berlin-clock/commit/439e4246e94d0895e34dfd279f9b55a95dc59f8d))
- set up basic iac code ([b0ac95f](https://github.com/gotreasa/gotreasa-berlin-clock/commit/b0ac95ffab2fa9a7488ebdf6e8969682a19041c2))
- set up image build for Okteto ([3c9fad8](https://github.com/gotreasa/gotreasa-berlin-clock/commit/3c9fad8d05390dd24e0ced4f45ef935cd138911e))
- set up retrieving seconds ([3820159](https://github.com/gotreasa/gotreasa-berlin-clock/commit/382015943a67acbb807cdfff170128a01bd0d4df))
- set up retrieving seconds ([9b897fc](https://github.com/gotreasa/gotreasa-berlin-clock/commit/9b897fc519c436fc9a55071d0575202720b116ea))
- setup of the repository ([f17c506](https://github.com/gotreasa/gotreasa-berlin-clock/commit/f17c5061c458d0b8f71c8a142de31491dd6c3b14))
- setup the hadolint step in the pipeline ([7ab555b](https://github.com/gotreasa/gotreasa-berlin-clock/commit/7ab555baf23a0a1ead01856db03b189d4105d51a))
- setup the OpenAPI specification ([cb41be1](https://github.com/gotreasa/gotreasa-berlin-clock/commit/cb41be12dc8f93c6470361481b0b3967c880651f))
- update the docker configuration for Okteto ([1f31380](https://github.com/gotreasa/gotreasa-berlin-clock/commit/1f31380d90ef5aebbd18ffcf74fc3095f6c1f572))

### Bug Fixes

- add missing checkout steps ([360b1b7](https://github.com/gotreasa/gotreasa-berlin-clock/commit/360b1b7bb1cf8c024c4014c005545e592c19fb0d))
- add the additional Error scenarios ([8182da3](https://github.com/gotreasa/gotreasa-berlin-clock/commit/8182da30a400a1710cc1a177032e2c861854d9b7))
- add the OKTETO_TOKEN ([530fb56](https://github.com/gotreasa/gotreasa-berlin-clock/commit/530fb56b57dae81770f8017a22b1075941a6ecdb))
- adding back in the generation of the pact tests ([53b19fd](https://github.com/gotreasa/gotreasa-berlin-clock/commit/53b19fd75835207547f1b6f99d503e5ab0a3abaa))
- change [0-9] in to \d ([ebe46bb](https://github.com/gotreasa/gotreasa-berlin-clock/commit/ebe46bb8ec27d0502fed25c3c899cade2c40e9b2))
- change badge for vulnerabilities to Sonar badge ([f86f7ef](https://github.com/gotreasa/gotreasa-berlin-clock/commit/f86f7effc2ff37a223f238292ed378f231580bd8))
- change github.ibm.com to github.com ([49a95af](https://github.com/gotreasa/gotreasa-berlin-clock/commit/49a95afca73fc056fcae25405ec8fa049d4abc84))
- change the allowed time format to all up to 23:59:59 ([cd6d86e](https://github.com/gotreasa/gotreasa-berlin-clock/commit/cd6d86eb621dda351d2f93de6e55b3e1105ab0e3))
- change the config of supertest for spinning an express server ([aec1740](https://github.com/gotreasa/gotreasa-berlin-clock/commit/aec174025f2ce13928b452f5abf7051b16d4eec2))
- change the regex to wrap the OR in brackets ([5b4324f](https://github.com/gotreasa/gotreasa-berlin-clock/commit/5b4324f322e2a7aa6df77d94147d0c2a4df38993))
- changing env to vars ([cb7e116](https://github.com/gotreasa/gotreasa-berlin-clock/commit/cb7e1168a578156bdc4cf2328aee36debf82b8f8))
- changing variables to env ([e1a515f](https://github.com/gotreasa/gotreasa-berlin-clock/commit/e1a515f4cc3e80782da503c4664cbf848e16d45b))
- checkout the code for picking up the Dockerfile ([ff527ba](https://github.com/gotreasa/gotreasa-berlin-clock/commit/ff527ba532493a800224a256d0d59792ddc60fe4))
- clean up the docker compose file ([7c040ba](https://github.com/gotreasa/gotreasa-berlin-clock/commit/7c040ba866df746b0f1f5ac6b593d1350bfdb727))
- correct namespace ([d3a72e3](https://github.com/gotreasa/gotreasa-berlin-clock/commit/d3a72e3f3419d1a4fbb5cb9dbf4d71ad20d59732))
- correct the image name ([01a98f0](https://github.com/gotreasa/gotreasa-berlin-clock/commit/01a98f04979b06703e6d5466216ff6d895f7936c))
- correct the name of okteto.yml used in the pipeline ([08634ce](https://github.com/gotreasa/gotreasa-berlin-clock/commit/08634ce3f52ed0c116ba2d259d0f624e2f66aa72))
- correct the organisation from xpfarm to gotreasa for Github ([d1515ff](https://github.com/gotreasa/gotreasa-berlin-clock/commit/d1515ff7ea3579da08de5e09350828a2b1e2b1fe))
- correct the start command for the server ([ae09679](https://github.com/gotreasa/gotreasa-berlin-clock/commit/ae0967975add5b1057a3c45d05dddbd147cd6238))
- correcting the uses for the detect-secrets ([14b0470](https://github.com/gotreasa/gotreasa-berlin-clock/commit/14b0470809a12a6a8b4917a10ba6c57ff2801d31))
- disable tty for the docker run ([a78693c](https://github.com/gotreasa/gotreasa-berlin-clock/commit/a78693c4c1c625fb61d93502aab7d65a0842aae9))
- disabling the collection of coverage for smoke tests ([e98f1ce](https://github.com/gotreasa/gotreasa-berlin-clock/commit/e98f1ce33b8a80020f852062854b0d906247ce51))
- fix typo in the name of the prune_images.sh script ([840f008](https://github.com/gotreasa/gotreasa-berlin-clock/commit/840f00897c672e4893f72608c91184aa9f2f6e90))
- give absolute path for the test command ([4e23a8d](https://github.com/gotreasa/gotreasa-berlin-clock/commit/4e23a8d4a085c899383071cd9ab2d9dbfd297a4b))
- make the container tests less brittle ([79c9667](https://github.com/gotreasa/gotreasa-berlin-clock/commit/79c966740dc5e6aa5fa10488786eea8743ad67b2))
- remove snyk from detect-secrets ([e133427](https://github.com/gotreasa/gotreasa-berlin-clock/commit/e133427eb425fb497c3b464be2a08a7e2b0d9e16))
- removed async when the result was not void ([d73f24c](https://github.com/gotreasa/gotreasa-berlin-clock/commit/d73f24cd64ef01b02f1b4b3f970f9e00cf1d0700))
- removing the unsupported platoforms from docker ([5ac5565](https://github.com/gotreasa/gotreasa-berlin-clock/commit/5ac5565e57d833eb0b678af5cf4e6585060968ad))
- simplify the health check to alway pass even if goss is not loaded ([e9c77e3](https://github.com/gotreasa/gotreasa-berlin-clock/commit/e9c77e3a744c983256f36a8a25fafd908e50fd93))
- snyc up the package lock file ([b9305bb](https://github.com/gotreasa/gotreasa-berlin-clock/commit/b9305bb82a7d16de70d641781fa02e0935b4606f))
- switch from dev to full URL ([d4ebdb8](https://github.com/gotreasa/gotreasa-berlin-clock/commit/d4ebdb8d2251d2b27c6e51f305fb27ef867a0033))
- switch over to use registry.cloud.okteto.net as the registry URL ([b495527](https://github.com/gotreasa/gotreasa-berlin-clock/commit/b49552750e907bfefe09dd59205e29f645ad0bc3))
- touching .env file for smoke testing ([e16a2b6](https://github.com/gotreasa/gotreasa-berlin-clock/commit/e16a2b688fe176310a131425173e0f43c55a1c75))
- trying to use the sonar token in a different way ([1f1c370](https://github.com/gotreasa/gotreasa-berlin-clock/commit/1f1c37000acdb36217ec11d2a815a29fa84a0c28))

### Reverts

- Revert "ci: speed up the running of tests" ([5874e22](https://github.com/gotreasa/gotreasa-berlin-clock/commit/5874e22d058c670c0e548917c308273b1686aafe))
- backing out some changes ([c5d0ee4](https://github.com/gotreasa/gotreasa-berlin-clock/commit/c5d0ee4018e9b7f8caf493829403683ad1e15cc7))
- changing back the exposed docker port ([102d0bd](https://github.com/gotreasa/gotreasa-berlin-clock/commit/102d0bd140e1a2198f9c75ef63825962b1103163))
- correct the wasted percentage ([7e7d501](https://github.com/gotreasa/gotreasa-berlin-clock/commit/7e7d501d149960b046e6adc2173ae111d2f58451))
- docker file env value ([f6306db](https://github.com/gotreasa/gotreasa-berlin-clock/commit/f6306db9f44523bb5566da8c80766f49806fbfad))
- re-enabling the build and deploy of the image ([2f920f7](https://github.com/gotreasa/gotreasa-berlin-clock/commit/2f920f7a0d8ce39f4428739a28ed24eb3bb1bf67))
- roll back /test endpoint ([f3ef67d](https://github.com/gotreasa/gotreasa-berlin-clock/commit/f3ef67db1f2473632cdf71248408f6a1b2cccde6))
- roll back the file for the stack ([a669b08](https://github.com/gotreasa/gotreasa-berlin-clock/commit/a669b0813f9ae83978735a19295007c276d552e4))
