import { getExecOutput } from '@actions/exec'
import { setFailed } from '@actions/core'

export async function findUnused(secrets) {
  const secretNames = secrets.map(secret => secret.name)

  try {
    const executionOutput = await getExecOutput(
      `egrep -r ${secretNames.join('|')} .github/workflows`,
      [],
      { silent: true, ignoreReturnCode: true }
    )

    return secretNames.filter(
      secret => !executionOutput.stdout.includes(secret)
    )
  } catch (err) {
    setFailed(`Searching for secrets failed with: ${err}`)
  }
}
