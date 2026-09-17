// lucide (PEAKUB DX initiative): `@clinext/sdk` sets up a runtime-global `CliNext` (prompts,
// payload, filesystem helpers) the same way `@servable/server` sets up a global `Servable` -
// this package doesn't publish its own ambient types, so `any` here is a deliberate ceiling
// rather than a precise contract.
declare global {
  // eslint-disable-next-line no-var
  var CliNext: any
}

export {}
