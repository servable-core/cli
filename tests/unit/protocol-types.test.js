import { jest } from '@jest/globals'

// See plan.test.js's own header for why this lives in tests/, not beside the command, and why
// the handler is called `handler({ toolbox: { payload } })` - the real shape @clinext/sdk uses.

const mockLoadServableConfig = jest.fn()
const mockBuildSchema = jest.fn()
const mockBuildProtocolResources = jest.fn()
const mockGenerateProtocolResourceTypes = jest.fn()
const mockWriteFileSync = jest.fn()

jest.unstable_mockModule('@servable/tools', () => ({
  __esModule: true,
  buildSchema: (...a) => mockBuildSchema(...a),
  buildProtocolResources: (...a) => mockBuildProtocolResources(...a),
  generateProtocolResourceTypes: (...a) => mockGenerateProtocolResourceTypes(...a),
}))
jest.unstable_mockModule('../../src/lib/schema/loadServableConfig.js', () => ({
  __esModule: true,
  default: (...a) => mockLoadServableConfig(...a),
}))
jest.unstable_mockModule('fs', () => ({
  __esModule: true,
  default: { writeFileSync: (...a) => mockWriteFileSync(...a) },
}))

const { default: protocolTypesCommand } = await import('../../src/commands/schema/protocol-types.js')

const run = async () => {
  const logs = []
  jest.spyOn(console, 'log').mockImplementation((...a) => logs.push(a.join(' ')))
  await protocolTypesCommand.handler({ toolbox: { payload: {} } })
  jest.restoreAllMocks()
  return { logs: logs.join('\n') }
}

beforeEach(() => jest.clearAllMocks())

describe('schema protocol-types', () => {
  test('builds schema live (for its protocols array), scans resources, and writes the generated .d.ts', async () => {
    const servableConfig = { id: 'app' }
    const protocols = [{ id: 'foo', loader: { path: '/app/protocols/foo' } }]
    const resources = {
      foo: {
        services: [{ id: 'foo.checkAuth', path: '/app/protocols/foo/services/checkAuth.js' }],
        jobs: [{ id: 'sendReminder', path: '/app/protocols/foo/jobs/sendReminder.js' }],
      },
    }

    mockLoadServableConfig.mockResolvedValue(servableConfig)
    mockBuildSchema.mockResolvedValue({ protocols })
    mockBuildProtocolResources.mockResolvedValue(resources)
    mockGenerateProtocolResourceTypes.mockReturnValue('declare global {}\nexport {}\n')

    const { logs } = await run()

    expect(mockBuildSchema).toHaveBeenCalledWith({ servableConfig })
    expect(mockBuildProtocolResources).toHaveBeenCalledWith({ protocols })
    expect(mockGenerateProtocolResourceTypes).toHaveBeenCalledWith(resources)
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      expect.stringMatching(/servable\.protocols\.types\.d\.ts$/),
      'declare global {}\nexport {}\n',
    )
    expect(logs).toMatch(/written/)
    expect(logs).toMatch(/1 services, 1 jobs across 1 protocols/)
  })

  test('reports zero counts without writing garbage when no protocol has any resources', async () => {
    mockLoadServableConfig.mockResolvedValue({})
    mockBuildSchema.mockResolvedValue({ protocols: [] })
    mockBuildProtocolResources.mockResolvedValue({})
    mockGenerateProtocolResourceTypes.mockReturnValue('export {}\n')

    const { logs } = await run()

    expect(logs).toMatch(/0 services, 0 jobs across 0 protocols/)
  })
})
