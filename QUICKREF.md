# @servable/cli — Quick Reference

## Schema (unischema)

Run from inside an app (wherever `servable.config.js` lives):

```sh
cd backend/main

servable schema build              # compile servable.schema.json from every protocol's schema.json
servable schema plan                # diff committed artifact vs. current sources
servable schema plan --ci           # same, exit 1 on any breaking change (for CI/build scripts)
servable schema apply               # build + refuse if anything is breaking
servable schema contract --reason="why this is safe now"      # remove a deprecated field/class
servable schema contract --reason="..." --force                # ...even if never marked deprecated
```

## Typical flow for an additive change (the common case)

1. Edit a protocol's `schema.json` — add a field/class/index.
2. `servable schema build` (or `apply`, same result when nothing's breaking).
3. Commit `servable.schema.json` alongside the `schema.json` change.

`plan`'s output for this:
```
SAFE (1) - applies automatically:
  + Publication.someNewField
```

## Removing a field — the expand/contract cycle

1. **Deprecate**: add `"deprecated": true` to the field in `schema.json`, `servable schema build`, ship it. Nothing is removed yet.
2. **Contract**, in a later release: remove the field from `schema.json`, then:
   ```sh
   servable schema contract --reason="superseded by X, deprecated since 2026-08"
   ```
   Refuses if `--reason` is missing, or if the field wasn't actually marked deprecated on the previously-committed artifact (use `--force` only for a field you're certain was never deployed).
3. Commit — `compatibilityFloor` in `servable.schema.json` is now bumped. Any pod still running the pre-contract build will refuse to boot against a database that's had this contraction applied (see the running server's own compatibility check).

## Reading a `plan` diff

```
SAFE (2) - applies automatically:
  + Publication.newField
  + index SlugableEntry (idx_name)

BREAKING, pre-deprecated (1) - eligible for 'schema contract':
  - Reaction.isSpark (was deprecated)

BREAKING, not deprecated (1) - never applied automatically:
  ~ Article.rank  Number → String
```

Only the top block ever applies without an explicit `contract`. `apply` refuses if either bottom block is non-empty.
