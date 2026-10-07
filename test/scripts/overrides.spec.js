import { checkOverrides, problemsIn } from '../../scripts/overrides';

const lock = (packages) => ({ packages: { '': {}, ...packages } });

describe('Checking whether package.json overrides are still needed', () => {
  test('should return nothing when there are no overrides', () => {
    expect(checkOverrides({}, lock({}))).toEqual([]);
  });

  test('should mark a scoped override as needed when the parent pins a version below it', () => {
    const results = checkOverrides(
      { overrides: { 'release-it': { undici: '^7.29.1' } } },
      lock({
        'node_modules/release-it': { dependencies: { undici: '7.29.0' } },
        'node_modules/undici': {},
      }),
    );

    expect(results).toEqual([
      {
        scope: 'release-it',
        name: 'undici',
        range: '^7.29.1',
        status: 'needed',
        declaredBy: [{ path: 'node_modules/release-it', range: '7.29.0' }],
      },
    ]);
  });

  test('should mark a scoped override as redundant when the parent already asks for a covered range', () => {
    const [result] = checkOverrides(
      { overrides: { 'release-it': { undici: '^7.29.1' } } },
      lock({
        'node_modules/release-it': { dependencies: { undici: '7.30.0' } },
        'node_modules/undici': {},
      }),
    );

    expect(result.status).toBe('redundant');
  });

  test('should mark a scoped override as unused when the parent is no longer installed', () => {
    const [result] = checkOverrides(
      { overrides: { 'release-it': { undici: '^7.29.1' } } },
      lock({ 'node_modules/undici': {} }),
    );

    expect(result).toEqual({
      scope: 'release-it',
      name: 'undici',
      range: '^7.29.1',
      status: 'unused',
      declaredBy: [],
    });
  });

  test("should mark a scoped override as unused when nothing in the parent's tree depends on it", () => {
    const [result] = checkOverrides(
      { overrides: { newman: { qs: '^6.15.2' } } },
      lock({ 'node_modules/newman': { dependencies: { lodash: '^4' } } }),
    );

    expect(result.status).toBe('unused');
  });

  test("should follow nested and hoisted packages in the parent's tree", () => {
    const [result] = checkOverrides(
      { overrides: { newman: { qs: '^6.15.2' } } },
      lock({
        'node_modules/newman': {
          dependencies: {
            'postman-request': '2.88.1',
            'postman-runtime': '7.56.1',
          },
        },
        'node_modules/newman/node_modules/postman-request': {
          dependencies: { qs: '~6.14.1' },
        },
        'node_modules/postman-runtime': {
          optionalDependencies: { qs: '^6.16.0' },
        },
        'node_modules/postman-request': { dependencies: { qs: '^6.16.0' } },
        'node_modules/qs': {},
      }),
    );

    expect(result.status).toBe('needed');
    expect(result.declaredBy).toEqual([
      {
        path: 'node_modules/newman/node_modules/postman-request',
        range: '~6.14.1',
      },
      { path: 'node_modules/postman-runtime', range: '^6.16.0' },
    ]);
  });

  test('should ignore dependencies that are not installed and survive dependency cycles', () => {
    const [result] = checkOverrides(
      { overrides: { a: { c: '^2.0.0' } } },
      lock({
        'node_modules/a': {
          dependencies: { b: '^1.0.0', missing: '^1.0.0' },
        },
        'node_modules/b': { dependencies: { a: '^1.0.0', c: '^2.1.0' } },
      }),
    );

    expect(result.status).toBe('redundant');
    expect(result.declaredBy).toEqual([
      { path: 'node_modules/b', range: '^2.1.0' },
    ]);
  });

  test('should treat a range it cannot compare as still needed', () => {
    const [result] = checkOverrides(
      { overrides: { a: { c: '^2.0.0' } } },
      lock({
        'node_modules/a': { dependencies: { c: 'npm:other-c@^2.0.0' } },
      }),
    );

    expect(result.status).toBe('needed');
  });

  test('should check a global override against every package that depends on it', () => {
    const results = checkOverrides(
      { overrides: { qs: '^6.15.2' } },
      lock({
        '': { dependencies: { qs: '^6.15.2' } },
        'node_modules/express': { dependencies: { qs: '^6.16.0' } },
        'node_modules/superagent': { dependencies: { qs: '^6.14.1' } },
      }),
    );

    expect(results).toEqual([
      {
        scope: '(global)',
        name: 'qs',
        range: '^6.15.2',
        status: 'needed',
        declaredBy: [
          { path: 'node_modules/express', range: '^6.16.0' },
          { path: 'node_modules/superagent', range: '^6.14.1' },
        ],
      },
    ]);
  });

  test('should skip entries it does not judge: the parent itself and deeper nesting', () => {
    const results = checkOverrides(
      { overrides: { a: { '.': '1.0.0', b: { c: '^1.0.0' } } } },
      lock({ 'node_modules/a': { dependencies: { b: '^1.0.0' } } }),
    );

    expect(results.map(({ name, status }) => [name, status])).toEqual([
      ['.', 'skipped'],
      ['b', 'skipped'],
    ]);
  });

  test('should report redundant, unused and conflicting overrides as problems', () => {
    const problems = problemsIn([
      { name: 'a', status: 'needed' },
      { name: 'b', status: 'redundant' },
      { name: 'c', status: 'unused' },
      { name: 'd', status: 'skipped' },
      { name: 'e', status: 'conflicting' },
    ]);

    expect(problems.map(({ name }) => name)).toEqual(['b', 'c', 'e']);
  });

  const parentPinsC = {
    'node_modules/p': { version: '1.0.0', dependencies: { c: '1.0.0' } },
    'node_modules/c': { version: '1.0.0' },
  };

  test.each([
    ['a $reference', '$c'],
    ['a dist-tag', 'latest'],
    ['an npm: alias', 'npm:other-c@^1.0.1'],
    ['a git spec', 'github:owner/c#v1.0.1'],
    ['an empty string', ''],
  ])(
    'should skip an override whose value is %s instead of crashing',
    (_, value) => {
      const [result] = checkOverrides(
        { overrides: { p: { c: value } } },
        lock(parentPinsC),
      );

      expect(result.status).toBe('skipped');
    },
  );

  test('should skip a global override whose value is not a semver range', () => {
    const [result] = checkOverrides(
      { overrides: { c: '$c' } },
      lock(parentPinsC),
    );

    expect(result.status).toBe('skipped');
  });

  test('should read a version-qualified parent key and judge only the matching copies', () => {
    const results = checkOverrides(
      { overrides: { 'p@1': { c: '^1.0.1' }, 'p@2': { c: '^1.0.1' } } },
      lock({
        'node_modules/p': { version: '1.0.0', dependencies: { c: '1.0.0' } },
        'node_modules/x': { version: '1.0.0', dependencies: { p: '^2.0.0' } },
        'node_modules/x/node_modules/p': {
          version: '2.0.0',
          dependencies: { c: '^1.0.2' },
        },
        'node_modules/c': { version: '1.0.0' },
      }),
    );

    expect(results.map(({ scope, status }) => [scope, status])).toEqual([
      ['p@1', 'needed'],
      ['p@2', 'redundant'],
    ]);
  });

  test('should judge every copy when the parent key carries a dist-tag', () => {
    const [result] = checkOverrides(
      { overrides: { 'p@latest': { c: '^1.0.1' } } },
      lock(parentPinsC),
    );

    expect(result.status).toBe('needed');
  });

  test('should find a parent installed under an alias by its real package name', () => {
    const [result] = checkOverrides(
      { overrides: { p: { c: '^1.0.1' } } },
      lock({
        'node_modules/p-alias': { name: 'p', dependencies: { c: '1.0.0' } },
        'node_modules/c': {},
      }),
    );

    expect(result.declaredBy).toEqual([
      { path: 'node_modules/p-alias', range: '1.0.0' },
    ]);
  });

  test('should match a version-qualified global override key by package name', () => {
    const [result] = checkOverrides(
      { overrides: { 'c@1': '^1.0.1' } },
      lock(parentPinsC),
    );

    expect(result).toMatchObject({ name: 'c', status: 'needed' });
  });

  test('should check the parent when it is only installed nested', () => {
    const [result] = checkOverrides(
      { overrides: { p: { c: '^1.0.1' } } },
      lock({
        'node_modules/x': { dependencies: { p: '1.0.0' } },
        'node_modules/x/node_modules/p': { dependencies: { c: '1.0.0' } },
        'node_modules/c': {},
      }),
    );

    expect(result.status).toBe('needed');
  });

  test('should keep an override needed while any copy of the parent still pins below it', () => {
    const [result] = checkOverrides(
      { overrides: { p: { c: '^1.0.1' } } },
      lock({
        'node_modules/p': { dependencies: { c: '1.0.2' } },
        'node_modules/x': { dependencies: { p: '0.9.0' } },
        'node_modules/x/node_modules/p': { dependencies: { c: '1.0.0' } },
        'node_modules/c': {},
      }),
    );

    expect(result.status).toBe('needed');
    expect(result.declaredBy.map(({ path }) => path)).toEqual([
      'node_modules/p',
      'node_modules/x/node_modules/p',
    ]);
  });

  test('should count peer dependencies, which npm also overrides', () => {
    const [result] = checkOverrides(
      { overrides: { p: { c: '^1.0.1' } } },
      lock({
        'node_modules/p': { peerDependencies: { c: '1.0.0' } },
        'node_modules/c': {},
      }),
    );

    expect(result.status).toBe('needed');
  });

  test('should count an empty declared range, which npm reads as any version', () => {
    const [result] = checkOverrides(
      { overrides: { p: { c: '^1.0.1' } } },
      lock({
        'node_modules/p': { dependencies: { c: '' } },
        'node_modules/c': {},
      }),
    );

    expect(result.status).toBe('needed');
  });

  test('should mark an override as conflicting when the parent now asks for a newer major', () => {
    const [result] = checkOverrides(
      { overrides: { 'release-it': { undici: '^7.30.0' } } },
      lock({
        'node_modules/release-it': { dependencies: { undici: '^8.0.0' } },
        'node_modules/undici': {},
      }),
    );

    expect(result.status).toBe('conflicting');
  });

  test('should follow a linked workspace parent and resolve from the workspace upwards', () => {
    const [result] = checkOverrides(
      { overrides: { p: { c: '^1.0.1' } } },
      lock({
        'node_modules/p': { link: true, resolved: 'packages/p' },
        'packages/p': { dependencies: { q: '^1.0.0' } },
        'node_modules/q': { dependencies: { c: '1.0.0' } },
        'node_modules/c': {},
      }),
    );

    expect(result.status).toBe('needed');
    expect(result.declaredBy).toEqual([
      { path: 'node_modules/q', range: '1.0.0' },
    ]);
  });

  test('should stop with a clear error when the lockfile has no packages map', () => {
    expect(() =>
      checkOverrides({ overrides: { p: { c: '^1.0.1' } } }, {}),
    ).toThrow('lockfileVersion 2 or later');
  });
});
