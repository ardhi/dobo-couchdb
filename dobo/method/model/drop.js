async function modelDrop ({ schema, options }) {
  const { getInfo } = this.app.dobo
  const { instance } = getInfo(schema)
  await instance.client.db.destroy(schema.modelName)
}

export default modelDrop
