import { jest } from '@jest/globals'

// Called exactly the way @clinext/sdk calls it: `handler({ toolbox })`, flags on toolbox.payload.
// Before that fix contract destructured `({ reason, force })` from the top-level argument, which
// clinext never populates - so every real `schema contract --reason=...` died on "--reason is
// required". Only read-only paths are exercised: nothing reaches the artifact write.
const mockCompileArtifact = jest.fn()
const mockComputePlan = jest.fn()
const mockLoadServableConfig = jest.fn()
const mockReadArtifact = jest.fn()

jest.unstable_mockModule('@servable/tools', () => ({
    __esModule: true,
    compileArtifact: (...a) => mockCompileArtifact(...a),
    plan: (...a) => mockComputePlan(...a),
}))
jest.unstable_mockModule('../../src/lib/schema/loadServableConfig.js', () => ({
    __esModule: true,
    default: (...a) => mockLoadServableConfig(...a),
    ARTIFACT_FILENAME: 'servable.schema.json',
}))
jest.unstable_mockModule('../../src/lib/schema/readArtifact.js', () => ({
    __esModule: true,
    default: (...a) => mockReadArtifact(...a),
}))

const { default: contractCommand } = await import('../../src/commands/schema/contract.js')

const run = async ({ payload = {}, handlerArg = { toolbox: { payload } }, result }) => {
    mockReadArtifact.mockReturnValue({ hash: 'before', compatibilityFloor: 0, breakingChanges: [] })
    mockCompileArtifact.mockResolvedValue({ hash: 'after' })
    mockComputePlan.mockReturnValue(result || { breaking: [], breakingDeprecated: [] })
    const exit = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('__exited__')
    })
    const errors = []
    const logs = []
    jest.spyOn(console, 'error').mockImplementation((...a) => errors.push(a.join(' ')))
    jest.spyOn(console, 'log').mockImplementation((...a) => logs.push(a.join(' ')))

    let exited = false
    try {
        await contractCommand.handler(handlerArg)
    } catch (e) {
        if (e.message !== '__exited__') throw e
        exited = true
    }
    jest.restoreAllMocks()
    return { exited, errors: errors.join('\n'), logs: logs.join('\n') }
}

beforeEach(() => jest.clearAllMocks())

describe('schema contract flags', () => {
    test('a --reason on toolbox.payload reaches the command', async () => {
        const { exited, errors, logs } = await run({ payload: { reason: 'superseded by nature' } })

        expect(errors).not.toMatch(/--reason is required/)
        expect(exited).toBe(false)
        expect(logs).toMatch(/nothing to do/i)
    })

    test('no reason still refuses', async () => {
        const { exited, errors } = await run({ payload: {} })
        expect(exited).toBe(true)
        expect(errors).toMatch(/--reason is required/)
    })

    test('an empty reason (e.g. a blank VSCode prompt) still refuses', async () => {
        const { exited, errors } = await run({ payload: { reason: '' } })
        expect(exited).toBe(true)
        expect(errors).toMatch(/--reason is required/)
    })

    test('without --force, a never-deprecated removal is refused', async () => {
        const removal = { kind: 'removed', className: 'Post', fieldName: 'title' }
        const { exited, errors } = await run({
            payload: { reason: 'r' },
            result: { breaking: [removal], breakingDeprecated: [] },
        })
        expect(exited).toBe(true)
        expect(errors).toMatch(/never marked deprecated/)
    })

    test('reads --reason from toolbox.payload only - a top-level reason is the shape that never worked', async () => {
        const { exited, errors } = await run({ handlerArg: { reason: 'top-level', toolbox: { payload: {} } } })
        expect(exited).toBe(true)
        expect(errors).toMatch(/--reason is required/)
    })
})
