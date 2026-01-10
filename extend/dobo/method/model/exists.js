async function modelExists ({ schema, options }) {
  const { getInfo } = this.app.dobo
  const { instance } = getInfo(schema)
  try {
    await instance.client.info()
  } catch (err) {
    if (err.statusCode === 404) return false
  }
  return true
}

export default modelExists
