import { jest } from '@jest/globals'

// See plan.test.js's own header for why this lives in tests/, not beside the command, and why
// the handler is called `handler({ toolbox: { payload } })` - the real shape @clinext/sdk uses.

const mockGenerateSchemaTypes = jest.fn()
const mockReadArtifact = jest.fn()
const mockWriteFileSync = jest.fn()

jest.unstable_mockModule('@servable/tools', () => ({
  __esModule: true,
  generateSchemaTypes: (...a) => mockGenerateSchemaTypes(...a),
}))
jest.unstable_mockModule('../../src/lib/schema/readArtifact.js', () => ({
  __esModule: true,
  default: (...a) => mockReadArtifact(...a),
}))
jest.unstable_mockModule('../../src/lib/schema/loadServableConfig.js', () => ({
  __esModule: true,
  default: jest.fn(),
  ARTIFACT_FILENAME: 'servable.schema.json',
}))
jest.unstable_mockModule('fs', () => ({
  __esModule: true,
  default: { writeFileSync: (...a) => mockWriteFileSync(...a) },
}))

const { default: typesCommand } = await import('../../src/commands/schema/types.js')

const run = async () => {
  const exit = jest.spyOn(process, 'exit').mockImplementation(() => {
    throw new Error('__exited__')
  })
  const errors = []
  const logs = []
  jest.spyOn(console, 'error').mockImplementation((...a) => errors.push(a.join(' ')))
  jest.spyOn(console, 'log').mockImplementation((...a) => logs.push(a.join(' ')))

  let exited = false
  try {
    await typesCommand.handler({ toolbox: { payload: {} } })
  } catch (e) {
    if (e.message !== '__exited__') throw e
    exited = true
  }
  const code = exit.mock.calls[0]?.[0]
  jest.restoreAllMocks()
  return { exited, code, errors: errors.join('\n'), logs: logs.join('\n') }
}

beforeEach(() => jest.clearAllMocks())

describe('schema types', () => {
  test('writes the generated .d.ts from the committed artifact', async () => {
    mockReadArtifact.mockReturnValue({ classes: [{ className: 'Genre' }] })
    mockGenerateSchemaTypes.mockReturnValue('export interface Genre {}\n')

    const { exited, logs } = await run()

    expect(exited).toBe(false)
    expect(mockGenerateSchemaTypes).toHaveBeenCalledWith({ classes: [{ className: 'Genre' }] })
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      expect.stringMatching(/servable\.schema\.types\.d\.ts$/),
      'export interface Genre {}\n',
    )
    expect(logs).toMatch(/written/)
  })

  test('fails closed with no artifact, rather than generating an empty file', async () => {
    mockReadArtifact.mockReturnValue(null)

    const { exited, code, errors } = await run()

    expect(exited).toBe(true)
    expect(code).toBe(1)
    expect(errors).toMatch(/No servable\.schema\.json found/)
    expect(mockGenerateSchemaTypes).not.toHaveBeenCalled()
    expect(mockWriteFileSync).not.toHaveBeenCalled()
  })
})
