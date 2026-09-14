import fs from 'fs'
import path from 'path'

// Guard against a bug this package has now shipped twice.
//
// package.json's `files` publishes src/, and clinext imports EVERY file under src/commands/ as a
// command at startup. A test file there is therefore loaded in a consumer's install, where jest
// and friends do not exist - and the CLI dies on every invocation, not just on the command that
// happens to contain it. Fixed once in be44f0e (commands/model/test.js), reintroduced in 2.0.1 by
// placing plan.test.js beside plan.js, fixed again in 2.0.2.
//
// Tests belong in tests/, which `files` does not publish.
const walk = (dir, out = []) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) walk(full, out)
        else out.push(full)
    }
    return out
}

test('no *.test.js is published under src/ - clinext would import it as a command', () => {
    const root = path.resolve(process.cwd(), 'src')
    const offenders = walk(root).filter((f) => f.endsWith('.test.js'))
    expect(offenders.map((f) => path.relative(process.cwd(), f))).toEqual([])
})
