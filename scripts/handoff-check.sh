#!/usr/bin/env sh
# Is HANDOFF.md still telling the truth?
#
# HANDOFF.md is only accurate up to the commit that last touched it. Anything
# committed after that -- by the other AI tool, or by the user by hand after a
# session ran out of tokens -- is work HANDOFF.md does not know about.
#
# Run this at the start of every session. Both tools are told to.

set -e
cd "$(dirname "$0")/.."

SYNCED=$(git log -1 --format=%H -- HANDOFF.md 2>/dev/null || true)

if [ -z "$SYNCED" ]; then
  echo "HANDOFF.md has never been committed. Treat it as unreliable."
  exit 0
fi

echo "HANDOFF.md was last updated at $(git log -1 --format='%h %ad' --date=short -- HANDOFF.md)"
echo

BEHIND=$(git log --oneline "$SYNCED"..HEAD)

if [ -z "$BEHIND" ]; then
  echo "✅ HANDOFF.md is current. Nothing has been committed since it was written."
else
  echo "⚠️  HANDOFF.md is STALE. These commits landed after it was last updated:"
  echo
  echo "$BEHIND" | sed 's/^/    /'
  echo
  echo "    Read them before trusting the 'Next step' in HANDOFF.md -- that work"
  echo "    may already be done, or half done. To see the code:"
  echo "        git diff --stat $SYNCED..HEAD"
fi

echo
DIRTY=$(git status --porcelain)
if [ -n "$DIRTY" ]; then
  echo "⚠️  Uncommitted changes in the working tree:"
  echo "$DIRTY" | sed 's/^/    /'
else
  echo "✅ Working tree clean."
fi
