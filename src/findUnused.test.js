import { getExecOutput } from '@actions/exec'
import { findUnused } from './findUnused'

const dummySecrets = [{ name: 'DUMMY_FOO' }, { name: 'DUMMY_BAR' }]

jest.mock('@actions/exec')

afterEach(() => {
  jest.clearAllMocks()
})

describe('findUnused', () => {
  it('Returns an array with unused secrets', async () => {
    getExecOutput.mockImplementation(async () => ({
      exitCode: 0,
      stdout: 'dummy output',
      stderr: ''
    }))
    expect(await findUnused(dummySecrets)).toEqual([])
  })
  it('Returns empty array if no unused secrets', async () => {
    getExecOutput.mockImplementation(async () => ({
      exitCode: 1,
      stdout: '',
      stderr: 'dummy error'
    }))
    expect(await findUnused(dummySecrets)).toEqual(['DUMMY_FOO', 'DUMMY_BAR'])
  })
})
