# Title

The PR title becomes the `main` commit (squash), so use Conventional Commits: feat:, fix:, refactor:, test:, docs:, ci:, chore:...
Remove sections that don't apply.

## Summary

What changes and why? One or two sentences.

## Related issue(s)

Closes #

## Changes

- Module/component touched & what it does differently
- Design decisions & rationale (esp. discarded alternatives)
- Breaking changes / required actions (env vars, migrations, API versions)
- What was intentionally left out
- NOT file names or line numbers

## How to test

Steps or commands to verify the change.

## Checklist

- [ ] Title follows Conventional Commits
- [ ] Reviewed my own diff in _Files changed_
- [ ] CI is green
- [ ] Updated README or documentation if applicable
- [ ] No secrets or credentials included
- [ ] Lint and tests pass locally
- [ ] If UI changes, attached screenshots (before/after) in Summary section
- [ ] If depends on an API change, indicated required version
