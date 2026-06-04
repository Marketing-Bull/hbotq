#!/bin/bash
# Nightly HBOTQ site improvement runner
# Picks next pending TODO item, executes, commits, pushes
# Works on branch: improve-credibility-conversion

set -e

REPO="/root/hermes/projects/hbotq-site"
BRANCH="improve-credibility-conversion"
cd "$REPO"

# Ensure branch is up to date
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

# Stage tracking files only for docs update
git add .hermes/site-improver/TODO.md .hermes/site-improver/COMPLETED.md
if git diff --cached --quiet; then
  echo "No TODO changes to commit."
else
  git commit -m "chore: update improvement tracking docs"
  git push origin "$BRANCH"
fi

echo "---"
echo "Nightly run complete. Next: inspect TODO.md for next pending item."
echo "PR: https://github.com/Marketing-Bull/hbotq/pull/1"
