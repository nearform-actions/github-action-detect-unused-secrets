# github-action-detect-unused-secrets

GitHub Action that automatically detects unused secrets comparing the workflow secret names with the repo secret names.

## Example usage

```yaml
name: detect-unused-secrets

on: [push]

jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - name: Give access to repo workspace
        uses: actions/checkout@v3
      - name: Detect unused secrets
        uses: nearform/github-action-detect-unused-secrets@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Usage

Configure this action in your workflows providing the inputs described below.

### actions/checkout@v3

**Required** This action checks-out your repository under $GITHUB_WORKSPACE, so the detect-unused-secrets workflow can access it. For more information check [actions/checkout](https://github.com/actions/checkout)

### `github-token`

**Required** A GitHub token. For additional information read this guide --> [#about-the-github_token-secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret)
