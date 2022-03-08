# github-action-detect-unused-secrets

GitHub Action that detects unused secrets.

## Example usage

:warning: The example below shows the jobs input with the minimum requirements.
You need to install a github app to your repo and save the **APP_ID** and the **PRIVATE_KEY** to your secrets.
The `tibdex/github-app-token@v1` and `actions/checkout@v3` are required to run this action

```yml:
 name: detect-unused-secrets

on:
  workflow_dispatch:
  schedule:
    - cron: '0 10 * * MON'

jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - name: Generate token
        id: generate_token
        uses: tibdex/github-app-token@v1
        with:
          app_id: ${{ secrets.APP_ID }}
          private_key: ${{ secrets.PRIVATE_KEY }}
      - name: Checkout Code
      - uses: actions/checkout@v3
      - name: Detect unused secrets
        uses: nearform/github-action-detect-unused-secrets@main
        with:
          github-token: ${{ steps.generate_token.outputs.token }}

```

## Usage

Configure this action in your workflows providing the inputs described below.

### Install a Github app to generate APP_ID and PRIVATE_KEY

**Required** You have to create a Github App and install it on the repo where you want to use this action. Check [this guide](https://docs.github.com/en/developers/apps/managing-github-apps/installing-github-apps) for installing a github app. Save the `APP_ID` and `PRIVATE_KEY` to the secrets in your repo.

### uses: tibdex/github-app-token@v1

**Required**

The default `secrets.GITHUB_TOKEN` has limited permissions [click here for more information](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token). `APP_ID` and `PRIVATE_KEY` are required inputs.

```yml
- name: Generate token
  id: generate_token
  uses: tibdex/github-app-token@v1
  with:
    app_id: ${{ secrets.APP_ID }}
    private_key: ${{ secrets.PRIVATE_KEY }}
```

### uses: actions/checkout@v3

**Required** This action checks-out your repository under $GITHUB_WORKSPACE therefore the detect-unused-secrets workflow can access it. For information check [actions/checkout](https://github.com/actions/checkout).

### `github-token`

**Required** A GitHub token. For additional information check the link below

[#about-the-github_token-secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret)
