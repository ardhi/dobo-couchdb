import getRecord from './get.js'

async function recordUpdate ({ schema, id, body, options } = {}) {
  const { noResult } = options
  const { getInfo } = this.app.dobo
  const { merge, omit } = this.app.lib._
  const { instance } = getInfo(schema)

  const old = noResult ? undefined : await getRecord.call(this, { schema, id, options: { silent: true } })
  const model = instance.client.use(schema.name)
  await model.insert(merge({ _id: id, _rev: old.data._rev }, omit(old.data, ['_id', '_rev']), body))
  if (noResult) return
  const result = await getRecord.call(this, { schema, id, options: { silent: true } })
  return { oldData: old.data, oldRev: old.rev, data: result.data, rev: result.rev }
}

export default recordUpdate
