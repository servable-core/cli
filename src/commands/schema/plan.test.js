import { jest } from '@jest/globals'

// First spec in this package. Covers the CI gate specifically, because that gate is what stands
// between an unbuilt schema change and a production image that cannot boot - a safe, unbuilt
// `+ _User.idiom` passed it on 2026-09-14 and a real production build proceeded.
//
// Everything the command touches is mocked: no protocol tree is compiled, no servable.schema.json
// is read, nothing is written. jest.unstable_mockModule + dynamic import so the mocks are in place
// before the module under test resolves its own imports (this package is ESM-native, run under
// --experimental-vm-modules).
const mockCompileArtifact = jest.fn()
const mockComputePlan = jest.fn()
const mockLoadServableConfig = jest.fn()
const mockReadArtifact = jest.fn()

jest.unstable_mockModule('@servable/tools', () => ({
    __esModule: true,
    compileArtifact: (...a) => mockCompileArtifact(...a),
    plan: (...a) => mockComputePlan(...a),
}))
jest.unstable_mockModule('../../lib/schema/loadServableConfig.js', () => ({
    __esModule: true,
    default: (...a) => mockLoadServableConfig(...a),
    ARTIFACT_FILENAME: 'servable.schema.json',
}))
jest.unstable_mockModule('../../lib/schema/readArtifact.js', () => ({
    __esModule: true,
    default: (...a) => mockReadArtifact(...a),
}))

const { default: planCommand } = await import('./plan.js')

const change = (kind, className, fieldName) => ({ kind, className, fieldName })

const run = async ({ result, ci }) => {
    mockComputePlan.mockReturnValue(result)
    const exit = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('__exited__')
    })
    const errors = []
    const logs = []
    jest.spyOn(console, 'error').mockImplementation((...a) => errors.push(a.join(' ')))
    jest.spyOn(console, 'log').mockImplementation((...a) => logs.push(a.join(' ')))

    let exited = false
    try {
        await planCommand.handler({ ci })
    } catch (e) {
        if (e.message !== '__exited__') throw e
        exited = true
    }
    const code = exit.mock.calls[0]?.[0]
    jest.restoreAllMocks()
    return { exited, code, errors: errors.join('\n'), logs: logs.join('\n') }
}

beforeEach(() => jest.clearAllMocks())

describe('schema plan --ci', () => {
    test('FAILS on a safe-but-unbuilt change - the artifact no longer matches the sources', async () => {
        const { exited, code, errors } = await run({
            ci: true,
            result: {
                hashChanged: true,
                safe: [change('added', '_User', 'idiom')],
                breakingDeprecated: [],
                breaking: [],
                hasBreakingChanges: false,
            },
        })

        expect(exited).toBe(true)
        expect(code).toBe(1)
        // Must name the command that fixes it, not just complain.
        expect(errors).toMatch(/out of date/i)
        expect(errors).toMatch(/schema apply/)
    })

    test('keeps the distinct breaking-change message', async () => {
        const { exited, code, errors } = await run({
            ci: true,
            result: {
                hashChanged: true,
                safe: [],
                breakingDeprecated: [],
                breaking: [change('removed', 'Post', 'title')],
                hasBreakingChanges: true,
            },
        })

        expect(exited).toBe(true)
        expect(code).toBe(1)
        expect(errors).toMatch(/breaking change/i)
        // The two failures must stay tellable apart.
        expect(errors).not.toMatch(/out of date/i)
    })

    test('PASSES when the artifact is in sync', async () => {
        const { exited, logs } = await run({
            ci: true,
            result: {
                hashChanged: false,
                safe: [],
                breakingDeprecated: [],
                breaking: [],
                hasBreakingChanges: false,
            },
        })

        expect(exited).toBe(false)
        expect(logs).toMatch(/No schema changes/i)
    })

    test('without --ci it stays a report and never exits non-zero', async () => {
        const { exited, logs } = await run({
            ci: false,
            result: {
                hashChanged: true,
                safe: [change('added', '_User', 'idiom')],
                breakingDeprecated: [],
                breaking: [change('removed', 'Post', 'title')],
                hasBreakingChanges: true,
            },
        })

        expect(exited).toBe(false)
        expect(logs).toMatch(/_User\.idiom/)
    })
})
