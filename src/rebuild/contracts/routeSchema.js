export const ROUTE_RECORD_FIELDS = Object.freeze([
  'path',
  'status',
  'locale',
  'family',
  'title',
  'h1',
  'summary',
  'sections',
  'links',
  'media',
  'source',
])

export function validateRouteRecords(records, expectedCount, owner) {
  if (!Array.isArray(records) || records.length !== expectedCount) {
    throw new Error(`${owner}: expected ${expectedCount} route records, received ${records?.length ?? 'non-array'}`)
  }

  const seen = new Set()
  for (const record of records) {
    for (const field of ROUTE_RECORD_FIELDS) {
      if (!(field in record)) throw new Error(`${owner}: ${record.path ?? 'unknown route'} is missing ${field}`)
    }
    if (!record.path.startsWith('/')) throw new Error(`${owner}: invalid path ${record.path}`)
    if (seen.has(record.path)) throw new Error(`${owner}: duplicate path ${record.path}`)
    if (![200, 404].includes(record.status)) throw new Error(`${owner}: invalid status for ${record.path}`)
    if (!['zh', 'en'].includes(record.locale)) throw new Error(`${owner}: invalid locale for ${record.path}`)
    if (!record.title || !record.h1) throw new Error(`${owner}: title and h1 are required for ${record.path}`)
    if (!Array.isArray(record.sections) || !Array.isArray(record.links) || !Array.isArray(record.media)) {
      throw new Error(`${owner}: sections, links, and media must be arrays for ${record.path}`)
    }
    seen.add(record.path)
  }

  return records
}
