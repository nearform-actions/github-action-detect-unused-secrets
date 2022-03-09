'use strict'
const exec = require('@actions/exec')
const { findUnused } = require('./findUnused')

process.env.GITHUB_WORKSPACE = './'
const secrets = [{ name: 'DUMMY_FOO' }, { name: 'DUMMY_BAR' }]

jest.mock('@actions/exec')

afterEach(() => {
  jest.clearAllMocks()
})

describe('findUnused', () => {
  it('Returns empty array if no unused secrets', async () => {
    exec.getExecOutput.mockImplementation(async () => ({
      exitCode: 0,
      stdout:
        ' .github/workflows/dummy.yml: github-token: ${{ secrets.DUMMY_FOO }} .github/workflows/test.yml:  github-token: ${{secrets.DUMMY_BAR}}',
      stderr: ''
    }))
    expect(await findUnused(secrets)).toEqual([])
  })
  it('Returns an array of unused secrets, when some are missing', async () => {
    exec.getExecOutput.mockImplementation(async () => ({
      exitCode: 0,
      stdout:
        ' .github/workflows/dummy.yml: github-token: ${{ secrets.DUMMY_FOO }}',
      stderr: ''
    }))
    expect(await findUnused(secrets)).toEqual(['DUMMY_BAR'])
  })
  it('Returns an array of unused secrets, when all are missing', async () => {
    exec.getExecOutput.mockImplementation(async () => ({
      exitCode: 1,
      stdout: '',
      stderr: 'error'
    }))
    expect(await findUnused(secrets)).toEqual(['DUMMY_FOO', 'DUMMY_BAR'])
  })
})
