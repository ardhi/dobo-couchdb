import PouchDB from 'pouchdb'
import mango from 'pouchdb-find'

PouchDB.plugin(mango)

async function instantiate ({ connection, schemas, noRebuild }) {
  const { pick, cloneDeep, merge, omit } = this.app.lib._
  this.instances = []
  const instance = pick(connection, ['name', 'type'])
  let url
  const opts = cloneDeep(connection.options ?? {})
  if (connection.host) {
    url = `${connection.proto ?? 'http'}://${connection.host}:${connection.port ?? 5984}/${connection.database}`
    if (connection.user) opts.auth = { user: connection.user, password: connection.password ?? '' }
    opts.skip_setup = false
  } else {
    url = connection.database
    opts.auto_compaction = opts.auto_compaction ?? true
  }
  for (const schema of schemas) {
    try {
      const ext = schema.table ?? schema.name
      const client = new PouchDB(`${url}_${ext}`, opts)
      this.instances.push(merge({}, instance, { client, name: `${instance.name}:${ext}` }))
      if (!noRebuild) {
        for (const p of schema.properties) {
          if (!p.index) continue
          const idxDef = {
            name: p.index.name,
            type: 'json',
            index: {
              fields: [p.name]
            }
          }
          await client.createIndex(idxDef)
        }
        for (const idx of schema.indexes ?? []) {
          const idxDef = {
            name: idx.name,
            type: 'json',
            index: {
              fields: idx.fields
            }
          }
          await client.createIndex(idxDef)
        }
      }
    } catch (err) {
      this.fatal('errorOn%s%s', `${connection.name}:${schema.name}`, err.message)
    }
  }
}

export default instantiate
