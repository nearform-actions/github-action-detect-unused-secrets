'use strict'
const core = require('@actions/core')
const github = require('@actions/github')
const toolkit = require('actions-toolkit')

const { findUnused } = require('./findUnused')

async function run() {
  toolkit.logActionRefWarning()
  toolkit.logRepoWarning()

  core.info(`
  *** ACTION RUN - START ***
  `)

  const githubToken = core.getInput('github-token', { required: true })
  const octokit = github.getOctokit(githubToken)
  const { owner, repo } = github.context.repo

  try {
    const { data } = await octokit.rest.actions.listRepoSecrets({
      owner,
      repo
    })

    const unusedSecrets = await findUnused(data.secrets)

    if (unusedSecrets.length) {
      core.setFailed(`Unused secrets detected: ${unusedSecrets.join(', ')}`)
    }
  } catch (err) {
    core.setFailed(`Action failed with error ${err}`)
  } finally {
    core.info(`
    *** ACTION RUN - END ***
    `)
  }
}

module.exports = {
  run
}
