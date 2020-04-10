![](https://github.com/CallePuzzle/envvar-to-dotenv-action/workflows/Test/badge.svg)

Environment variable to dotenv GitHub Action
============================================
Action to append environment variables to a dotenv file.

This repo is inspired/folked by [https://github.com/TickX/var-to-dotenv](https://github.com/TickX/var-to-dotenv).

Usage
---------

A single variable:
```yaml
env:
  ENV_VAR1: 'value'
  ENV_VAR2: 'value2'
jobs:
  single:
    name: Single
    runs-on: ubuntu-latest
    steps:
      - name: Test name
        uses: CallePuzzle/envvar-to-dotenv-action@0.1.0
        with:
          variableName: ENV_VAR1
```

A many variables:
```yaml
env:
  ENV_VAR1: 'value'
  ENV_VAR2: 'value2'
jobs:
  single:
    name: Single
    runs-on: ubuntu-latest
    steps:
      - name: Test name
        uses: CallePuzzle/envvar-to-dotenv-action@0.1.0
        with:
          variableNames: ENV_VAR1,ENV_VAR2
```

All variables matching regex:
```yaml
env:
  ENV_VAR1: 'value'
  ENV_VAR2: 'value2'
jobs:
  single:
    name: Single
    runs-on: ubuntu-latest
    steps:
      - name: Test name
        uses: CallePuzzle/envvar-to-dotenv-action@0.1.0
        with:
          variableNamesByFilter: ^ENV_(VAR.*)
```
