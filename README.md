# Detect unused secrets GitHub Action

Detect unused github secrets

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
      - name: Detect unused secrets
        uses: nearform/github-action-detect-unused-secrets@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Usage

Configure this action in your workflows providing the inputs described below.

### `github-token`

**Required** A GitHub token. For additional information read this guide --> [#about-the-github_token-secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret)

This should be a token with access to your repository scoped in as a secret.
The YML workflow will need to set github-token with the GitHub Secret Token
github-token: ${{ secrets.GITHUB_TOKEN }}
