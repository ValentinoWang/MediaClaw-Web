import { pathToFileURL } from 'node:url'

const [modulePath, expectedCountText, owner] = process.argv.slice(2)
const expectedCount = Number(expectedCountText)
if (!modulePath || !Number.isInteger(expectedCount) || !owner) {
  throw new Error('usage: node validate-route-module.mjs <module> <expected-count> <owner>')
}

const module = await import(`${pathToFileURL(modulePath).href}?validation=${Date.now()}`)
const records = module.default
if (!Array.isArray(records)) throw new Error(`${owner}: default export must be an array`)
if (records.length !== expectedCount) throw new Error(`${owner}: expected ${expectedCount}, received ${records.length}`)

const required = ['path', 'status', 'locale', 'family', 'title', 'h1', 'summary', 'sections', 'links', 'media', 'source']
const paths = new Set()
for (const record of records) {
  for (const key of required) {
    if (!(key in record)) throw new Error(`${owner}: ${record.path ?? '<unknown>'} missing ${key}`)
  }
  if (paths.has(record.path)) throw new Error(`${owner}: duplicate path ${record.path}`)
  if (!['zh', 'en'].includes(record.locale)) throw new Error(`${owner}: invalid locale ${record.locale}`)
  if (![200, 404].includes(record.status)) throw new Error(`${owner}: invalid status ${record.status}`)
  if (!record.path.startsWith('/') || !record.title || !record.h1) throw new Error(`${owner}: invalid route identity`)
  if (![record.sections, record.links, record.media].every(Array.isArray)) throw new Error(`${owner}: invalid collection field`)
  paths.add(record.path)
}

console.log(JSON.stringify({ owner, count: records.length, uniquePaths: paths.size }))
