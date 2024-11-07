import getRecord from './get.js'

async function recordRemove ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.app.dobo
  const { noResult } = options
  const { instance } = getInfo(schema)

  const rec = noResult ? undefined : await getRecord.call(this, { schema, id, options: { thrownNotFound: true } })
  const model = instance.client.use(schema.name)
  const resp = await model.destroy(id, rec._rev)
  if (noResult) return
  return { oldData: rec.data, oldRev: rec.rev, newRev: resp._rev }
}

export default recordRemove
