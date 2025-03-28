async function recordGet ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.app.dobo
  const { instance } = getInfo(schema)
  const { thrownNotFound } = options

  const model = instance.client.use(schema.name)
  let result
  try {
    result = await model.get(id)
  } catch (err) {
    if (thrownNotFound) throw this.error('recordNotFound%s%s', id, schema.name, { statusCode: 404 })
    throw err
  }
  return { data: result, rev: result ? result._rev : null }
}

export default recordGet
