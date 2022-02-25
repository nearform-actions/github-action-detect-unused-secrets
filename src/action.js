import * as core from '@actions/core'
import * as github from '@actions/github'

export async function run() {
  core.info(`
  *** ACTION RUN - START ***
  `)
  // get all the repo secrets
  // check what secrets are used in the workflows
  // log error for unused secrets

  const githubToken = core.getInput('github-token', { required: true })
  const octokit = github.getOctokit(githubToken)
  const { owner, repo } = github.context.repo

  try {
    const { secrets } = await octokit.rest.actions.listRepoSecrets({
      owner,
      repo
    })

    const unusedSecrets = []
    secrets.forEach(secret => {
      if (github.context.workflow.includes(secret.name)) {
        unusedSecrets.push(secret.name)
      }
    })

    if (unusedSecrets.length) {
      core.setFailed(`
      Unused secrets detected: ${unusedSecrets.join(', ')}
      `)
    }
  } catch (err) {
    core.setFailed(`Action failed with error ${err}`)
  } finally {
    core.info(`
    *** ACTION RUN - END ***
    `)
  }
}
