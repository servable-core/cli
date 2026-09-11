# Servable CLI

> [!WARNING]
> Servable is still experimental and its api may change in the future.

![logo](/static/img/icon.png)

[![npm Package](https://img.shields.io/npm/v/toolbox-servable.svg?style=flat-square)](https://www.npmjs.org/package/toolbox-servable)
[![NPM Downloads](https://img.shields.io/npm/dm/toolbox-servable.svg)](https://npmjs.org/package/toolbox-servable)
[![Build Status](https://github.com/servable-community/toolbox-servable/actions/workflows/release.yml/badge.svg)](https://github.com/servable-community/toolbox-servable/actions/tests.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install -g @servable/cli
```
or

```bash
yarn global add @servable/cli
```

## Usage

### Run
To launch the cli simply type:

```bash
servable
```

![The command toolbox](/static/img/s1.png)

### Command line

```
Usage:
  servable:app [<destination>] [options]


```

### Schema

Each protocol (and the app itself) keeps its data schema in a single, flat `schema.json` at its
root - no version folders, no migration scripts to write by hand. It has two parts: `managed`
(the classes/fields this protocol owns) and `target` (fields, indexes, and class-level
permissions on classes owned elsewhere).

```bash
servable schema build              # compile the app's schema artifact from every protocol's schema.json
servable schema plan               # show what changed since the last committed artifact
servable schema plan --ci          # same, but exits non-zero on any breaking change - for a CI/build step
servable schema apply              # commit the artifact - refuses if it contains any breaking change
servable schema contract --reason="why this is safe"   # remove a field/class that was already marked deprecated
```

The compiled artifact (`servable.schema.json`) is meant to be committed alongside your
`schema.json` changes, the same way a lockfile is. A running app checks its own compiled schema
against that committed artifact at boot and refuses to start if they don't match, or if a newer
deploy already removed something this build's code might still expect - so a schema change is
either safe to apply automatically (adding a field or class), or has to go through `deprecated:
true` first and `schema contract` explicitly once nothing depends on it anymore.

A full documentation is available at [https://docs.servable.app](https://docs.servable.app)
