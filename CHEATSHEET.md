# Git Commands Cheat Sheet

## Basic Workflow
- **git status**: Shows current state of working directory. Use BEFORE commit to see untracked/modified files. What changed? What needs add/commit?
- **git add <file>**: Stages file for commit. Use after edit, to prepare for commit. Example: `git add index.ts` (add one), `git add .` (add all).
- **git commit -m "message"**: Saves staged changes to repo. Message describe what changed (e.g., "Fix import errors"). Use after add, to create snapshot.
- **git push**: Uploads local commits to GitHub. Use after commit, to sync remote. Need auth first time.

## When to Use Each
- **git status**: Always before add/commit, to see what's happening.
- **git add**: When you edited files and ready to save changes.
- **git commit**: After add, to create permanent record of changes.
- **git push**: After commit, to share with GitHub.

## Other Useful
- **git log**: Shows commit history. Use to see past changes.
- **git diff**: Shows differences between files. Use to review changes before commit.
- **git pull**: Downloads latest from GitHub. Use to get updates from others.