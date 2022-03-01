import * as core from '@actions/core'
import { findUnused } from './findUnused'

import { run } from './action'

jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  setFailed: jest.fn(),
  info: jest.fn()
}))
jest.mock('@actions/github', () => ({
  getOctokit: jest.fn(() => ({
    rest: {
      actions: {
        listRepoSecrets: async () => ({
          data: {
            secrets: [{ name: 'FOO_SECRET' }, { name: 'BAR_SECRET' }]
          }
        })
      }
    }
  })),
  context: { repo: { owner: 'semra', repo: 'testrepo' } }
}))
jest.mock('./findUnused.js', () => ({
  findUnused: jest.fn()
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('action', () => {
  it('Sets the action failed if there are unused secrets', async () => {
    findUnused.mockReturnValue(['UNUSED', 'FO'])
    await run()
    expect(core.setFailed).toHaveBeenCalledWith(
      'Unused secrets detected: UNUSED, FO'
    )
  })
  it('Action passes when all secrets are used', async () => {
    findUnused.mockReturnValue([])
    await run()
    expect(core.setFailed).not.toHaveBeenCalled()
  })
})
