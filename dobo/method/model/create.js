async function modelCreate ({ schema, options = {} }) {
  const { getInfo } = this.app.dobo
  const { instance } = getInfo(schema)
  await instance.client.db.create(schema.modelName)
  const model = instance.client.use(schema.modelName)
  for (const p of schema.properties) {
    if (p.index || p.unique) await model.createIndex({ index: { fields: [p.name] } })
  }
}

export default modelCreate