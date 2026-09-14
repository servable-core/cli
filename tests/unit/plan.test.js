import { jest } from '@jest/globals'

// Lives in tests/, NOT beside the command it covers. `files` publishes src/, and clinext imports
// every file under src/commands/ as a command at startup - a *.test.js there is loaded in a
// consumer's install, where its devDependencies do not exist, and the whole CLI dies. That broke
// 2.0.1; no-tests-in-src.test.js guards it.
//
// The handler is called exactly the way @clinext/sdk calls it: `handler({ toolbox })`, with parsed
// flags on toolbox.payload. An earlier version of this file called handler({ ci: true }) - a shape
// clinext never produces - and so stayed green while `schema plan --ci` did nothing in the real CLI.
// The last test pins that down.
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

const { default: planCommand } = await import('../../src/commands/schema/plan.js')

const change = (kind, className, fieldName) => ({ kind, className, fieldName })

const safeDrift = {
    hashChanged: true,
    safe: [change('added', '_User', 'idiom')],
    breakingDeprecated: [],
    breaking: [],
    hasBreakingChanges: false,
}

// handlerArg defaults to the real clinext shape; overridable to prove other shapes are not read.
const run = async ({ result, payload = {}, handlerArg = { toolbox: { payload } } }) => {
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
        await planCommand.handler(handlerArg)
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
        const { exited, code, errors } = await run({ result: safeDrift, payload: { ci: true } })

        expect(exited).toBe(true)
        expect(code).toBe(1)
        expect(errors).toMatch(/out of date/i)
        expect(errors).toMatch(/schema apply/)
    })

    test('keeps the distinct breaking-change message', async () => {
        const { exited, code, errors } = await run({
            payload: { ci: true },
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
        expect(errors).not.toMatch(/out of date/i)
    })

    test('PASSES when the artifact is in sync', async () => {
        const { exited, logs } = await run({
            payload: { ci: true },
            result: { hashChanged: false, safe: [], breakingDeprecated: [], breaking: [], hasBreakingChanges: false },
        })

        expect(exited).toBe(false)
        expect(logs).toMatch(/No schema changes/i)
    })

    test('without --ci it stays a report and never exits non-zero', async () => {
        const { exited, logs } = await run({ result: safeDrift, payload: {} })

        expect(exited).toBe(false)
        expect(logs).toMatch(/_User\.idiom/)
    })

    test('reads --ci from toolbox.payload only - a top-level ci arg is the shape that never worked', async () => {
        const { exited } = await run({
            result: safeDrift,
            handlerArg: { ci: true, toolbox: { payload: {} } },
        })
        expect(exited).toBe(false)
    })
})
