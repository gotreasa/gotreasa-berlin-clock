import packageJson from '../package.json' with { type: 'json' };
import packageLock from '../package-lock.json' with { type: 'json' };
import { checkOverrides, problemsIn } from './overrides.js';

const ADVICE = {
  redundant: 'every dependent already asks for a covered range: remove it',
  unused: 'nothing installed depends on it any more: remove it',
  conflicting: 'a dependent now asks for versions above it: raise or remove it',
};

const results = checkOverrides(packageJson, packageLock);

for (const { scope, name, range, status, declaredBy } of results) {
  const wanted =
    declaredBy
      .map(
        ({ path, range: declared }) =>
          `${path.replace(/^.*node_modules\//, '')} wants ${name}@${declared}`,
      )
      .join(', ') || 'nothing';
  console.log(
    `${status.padEnd(11)} ${scope} > ${name} ${range ?? ''} (${wanted})`,
  );
}

const problems = problemsIn(results);
if (problems.length > 0) {
  console.log(`\n${problems.length} override(s) to fix in package.json:`);
  for (const { scope, name, status } of problems) {
    console.log(`  ${scope} > ${name}: ${ADVICE[status]}`);
  }
  process.exit(1);
}
