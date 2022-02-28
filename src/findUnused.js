import { getExecOutput } from '@actions/exec'
import { setFailed } from '@actions/core'

export async function findUnused(secrets) {
  try {
    return secrets.reduce(async (unusedPromise, secret) => {
      const unused = await unusedPromise
      const execOutput = await getExecOutput(
        `grep -r ${secret.name} .github/workflows`,
        [],
        { silent: true, ignoreReturnCode: true }
      )

      if (!execOutput.stdout) {
        return [...unused, secret.name]
      }
      return unused
    }, Promise.resolve([]))
  } catch (err) {
    setFailed(`Searching for secrets failed with: ${err}`)
  }
}
