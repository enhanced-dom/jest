export default new Proxy({}, { get: (_, prop) => (typeof prop === 'string' ? prop : undefined) }) as Record<string, string>
