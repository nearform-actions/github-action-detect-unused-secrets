import * as core from '@actions/core'
import * as github from '@actions/github'

import { findUnused } from './findUnused'

export async function run() {
  core.info(`
  *** ACTION RUN - START ***
  `)

  const githubToken = core.getInput('github-token', { required: true })
  const octokit = github.getOctokit(githubToken)
  const { owner, repo } = github.context.repo

  try {
    const { secrets } = await octokit.rest.actions.listRepoSecrets({
      owner,
      repo
    })

    const unusedSecrets = await findUnused(secrets)

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
