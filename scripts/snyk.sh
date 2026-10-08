#!/bin/bash
# Runs the Snyk CLI with the given arguments and passes its exit code through.
# When Snyk says a test limit was reached, it records limit=true as a step
# output, so a later step can fail the job even where this step tolerates
# errors (continue-on-error, kept so that SARIF uploads still run).
set -o pipefail

log="$(mktemp)"
NO_COLOR=1 npx --no-install snyk "$@" 2>&1 | tee "$log"
status=$?

if grep -qiE 'limit of [0-9]+ private tests|used your limit of private tests' "$log"; then
  echo "::error::Snyk test limit reached: these results are incomplete. $(grep -oiE '[^.]*limit of[^.]*' "$log" | head -1)"
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "limit=true" >> "$GITHUB_OUTPUT"
  fi
fi

rm -f "$log"
exit "$status"
