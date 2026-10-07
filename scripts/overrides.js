import semver from 'semver';

// An override is only worth keeping while something it applies to still asks for a
// version outside its range. Lockfile entries keep each package's declared ranges,
// so they show what would be installed without the override.

const declaredDependencies = (entry) => ({
  ...entry.dependencies,
  ...entry.optionalDependencies,
});

// The package's own path, then each enclosing package path, then the root ('').
const ancestors = (path) => {
  const bases = [path];
  let base = path;

  while (base) {
    base = base.slice(0, base.lastIndexOf('node_modules/')).replace(/\/$/, '');
    bases.push(base);
  }

  return bases;
};

const modulePath = (base, name) =>
  base ? `${base}/node_modules/${name}` : `node_modules/${name}`;

// Node resolution: the nearest node_modules/<name> walking up from the package.
const resolvePackage = (lock, fromPath, name) =>
  ancestors(fromPath)
    .map((base) => modulePath(base, name))
    .find((candidate) => lock.packages[candidate]);

// Records the package if it declares `name`, and returns the packages it depends on.
const visit = (lock, path, name, declarers) => {
  const dependencies = declaredDependencies(lock.packages[path]);

  if (dependencies[name]) {
    declarers.push({ path, range: dependencies[name] });
  }

  return Object.keys(dependencies)
    .map((dependency) => resolvePackage(lock, path, dependency))
    .filter(Boolean);
};

const declarersInTree = (lock, rootPath, name) => {
  const seen = new Set();
  const queue = [rootPath];
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

const declarersAnywhere = (lock, name) =>
  Object.entries(lock.packages)
    .filter(([path, entry]) => path !== '' && declaredDependencies(entry)[name])
    .map(([path, entry]) => ({
      path,
      range: declaredDependencies(entry)[name],
    }));

const isCovered = (declared, range) =>
  semver.validRange(declared) !== null && semver.subset(declared, range);

const statusOf = (declarers, range) => {
  if (declarers.length === 0) {
    return 'unused';
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
const isJudged = (name, range) => name !== '.' && typeof range === 'string';

const scopedResults = (lock, parent, entries) => {
  const parentPath = resolvePackage(lock, '', parent);

  return Object.entries(entries).map(([name, range]) => {
    if (!isJudged(name, range)) {
      return skipped(parent, name);
    }

    const declaredBy = parentPath
      ? declarersInTree(lock, parentPath, name)
      : [];

    return resultFor(parent, name, range, declaredBy);
  });
};

export const checkOverrides = (packageJson, packageLock) =>
  Object.entries(packageJson.overrides ?? {}).flatMap(([key, value]) =>
    typeof value === 'string'
      ? [resultFor('(global)', key, value, declarersAnywhere(packageLock, key))]
      : scopedResults(packageLock, key, value),
  );

export const problemsIn = (results) =>
  results.filter(({ status }) => status === 'redundant' || status === 'unused');
