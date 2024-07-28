import getRecord from './get.js'

async function recordCreate ({ schema, body, options = {} } = {}) {
  const { getInfo } = this.app.dobo
  const { instance } = getInfo(schema)
  const { noResult } = options
  const bodyId = body.id
  delete body.id
  const model = instance.client.use(schema.modelName)
  await model.insert(body, bodyId)
  if (noResult) return
  return await getRecord.call(this, { schema, id: bodyId })
}

export default recordCreate
