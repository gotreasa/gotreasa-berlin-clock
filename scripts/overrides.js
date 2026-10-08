import npa from 'npm-package-arg';
import semver from 'semver';

// An override is only worth keeping while something it applies to still asks for a
// version outside its range. Lockfile entries keep each package's declared ranges,
// so they show what would be installed without the override.

const NODE_MODULES = 'node_modules/';

// Peers first, so a package's own dependencies win when it declares both. npm
// applies overrides to peer dependencies too.
const declaredDependencies = (entry) => ({
  ...entry.peerDependencies,
  ...entry.dependencies,
  ...entry.optionalDependencies,
});

const packageNameAt = (path) =>
  path.slice(path.lastIndexOf(NODE_MODULES) + NODE_MODULES.length);

// The enclosing package path, or the root ('') for a top-level or workspace path.
const parentOf = (base) => {
  const index = base.lastIndexOf(NODE_MODULES);

  return index < 0 ? '' : base.slice(0, index).replace(/\/$/, '');
};

// The package's own path, then each enclosing package path, then the root ('').
const ancestors = (path) => {
  const bases = [path];
  let base = path;

  while (base) {
    base = parentOf(base);
    bases.push(base);
  }

  return bases;
};

const modulePath = (base, name) =>
  base ? `${base}/${NODE_MODULES}${name}` : `${NODE_MODULES}${name}`;

// A linked (workspace) entry points at the folder that holds the real package.
const realPath = (lock, path) =>
  lock.packages[path].link ? lock.packages[path].resolved : path;

// Node resolution: the nearest node_modules/<name> walking up from the package.
const resolvePackage = (lock, fromPath, name) =>
  ancestors(fromPath)
    .map((base) => modulePath(base, name))
    .find((candidate) => lock.packages[candidate]);

// Records the package if it declares `name`, and returns the packages it depends on.
const visit = (lock, path, name, declarers) => {
  const dependencies = declaredDependencies(lock.packages[path]);

  if (name in dependencies) {
    declarers.push({ path, range: dependencies[name] });
  }

  return Object.keys(dependencies)
    .map((dependency) => resolvePackage(lock, path, dependency))
    .filter(Boolean)
    .map((resolved) => realPath(lock, resolved));
};

const declarersInTree = (lock, roots, name) => {
  const seen = new Set();
  const queue = [...roots];
  const declarers = [];

  while (queue.length > 0) {
    const path = queue.shift();

    if (!seen.has(path)) {
      seen.add(path);
      queue.push(...visit(lock, path, name, declarers));
    }
  }

  return declarers;
};

const isCopyOf = (path, entry, name) =>
  path !== '' && (entry.name ?? packageNameAt(path)) === name;

// A key such as "newman@6" only applies to the copies its spec matches.
const matchesSpec = (entry, spec) =>
  spec === '*' ||
  semver.validRange(spec) === null ||
  semver.satisfies(entry.version, spec);

// Every installed copy of the parent: a scoped override applies to all of them.
const copiesOf = (lock, key) => {
  const { name, rawSpec } = npa(key);

  return Object.entries(lock.packages)
    .filter(([path, entry]) => isCopyOf(path, entry, name))
    .map(([path]) => realPath(lock, path))
    .filter((path) => matchesSpec(lock.packages[path], rawSpec));
};

const declarersAnywhere = (lock, name) =>
  Object.entries(lock.packages)
    .filter(
      ([path, entry]) => path !== '' && name in declaredDependencies(entry),
    )
    .map(([path, entry]) => ({
      path,
      range: declaredDependencies(entry)[name],
    }));

// $references, dist-tags, aliases, git and file specs, and '' are not judged.
const isPlainRange = (range) =>
  typeof range === 'string' &&
  range !== '' &&
  semver.validRange(range) !== null;

const isCovered = (declared, range) =>
  semver.validRange(declared) !== null && semver.subset(declared, range);

// The dependent now asks for versions entirely above what the override allows.
const isAbove = (declared, range) =>
  semver.validRange(declared) !== null &&
  semver.gtr(semver.minVersion(declared), range);

const statusOf = (declarers, range) => {
  if (declarers.length === 0) {
    return 'unused';
  }

  if (declarers.some(({ range: declared }) => isAbove(declared, range))) {
    return 'conflicting';
  }

  return declarers.every(({ range: declared }) => isCovered(declared, range))
    ? 'redundant'
    : 'needed';
};

const resultFor = (scope, name, range, declaredBy) => ({
  scope,
  name,
  range,
  status: statusOf(declaredBy, range),
  declaredBy,
});

const skipped = (scope, name) => ({
  scope,
  name,
  range: null,
  status: 'skipped',
  declaredBy: [],
});

// The parent's own override ('.') and deeper nesting are not judged.
const isJudged = (name, range) => name !== '.' && isPlainRange(range);

const scopedResults = (lock, key, entries) => {
  const copies = copiesOf(lock, key);

  return Object.entries(entries).map(([name, range]) =>
    isJudged(name, range)
      ? resultFor(key, name, range, declarersInTree(lock, copies, name))
      : skipped(key, name),
  );
};

const globalResult = (lock, key, range) => {
  const { name } = npa(key);

  return isPlainRange(range)
    ? resultFor('(global)', name, range, declarersAnywhere(lock, name))
    : skipped('(global)', name);
};

const assertPackagesMap = (lock) => {
  if (!lock.packages) {
    throw new Error(
      'package-lock.json has no "packages" map: lockfileVersion 2 or later is required',
    );
  }
};

export const checkOverrides = (packageJson, packageLock) => {
  assertPackagesMap(packageLock);

  return Object.entries(packageJson.overrides ?? {}).flatMap(([key, value]) =>
    typeof value === 'string'
      ? [globalResult(packageLock, key, value)]
      : scopedResults(packageLock, key, value),
  );
};

export const problemsIn = (results) =>
  results.filter(({ status }) =>
    ['redundant', 'unused', 'conflicting'].includes(status),
  );
