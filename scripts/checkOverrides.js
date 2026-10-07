import packageJson from '../package.json' with { type: 'json' };
import packageLock from '../package-lock.json' with { type: 'json' };
import { checkOverrides, problemsIn } from './overrides.js';

const results = checkOverrides(packageJson, packageLock);

for (const { scope, name, range, status, declaredBy } of results) {
  const wanted =
    declaredBy
      .map(
        ({ path, range: declared }) =>
          `${path.replace(/^node_modules\//, '')}@${declared}`,
      )
      .join(', ') || 'nothing';
  console.log(
    `${status.padEnd(9)} ${scope} > ${name} ${range ?? ''} (asked for by: ${wanted})`,
  );
}

const problems = problemsIn(results);
if (problems.length > 0) {
  console.log(
    `\n${problems.length} override(s) no longer needed. Remove them from package.json "overrides":`,
  );
  for (const { scope, name } of problems) {
    console.log(`  ${scope} > ${name}`);
  }
  process.exit(1);
}
