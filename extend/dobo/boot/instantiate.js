import nano from 'nano'
import modelCreate from '../method/model/create.js'
import modelExists from '../method/model/exists.js'

async function instantiate ({ connection, schemas, noRebuild }) {
  const { pick } = this.lib._
  this.instances = this.instances ?? []
  const instance = pick(connection, ['name', 'type'])
  let url = connection.url
  if (!url) {
    url = `${connection.proto}://`
    if (connection.user) url += `${connection.user}:${connection.password}@`
    url += `${connection.host}:${connection.port}`
  }
  instance.client = nano(url)
  this.instances.push(instance)
  if (noRebuild) return
  for (const schema of schemas) {
    const exists = await modelExists.call(this, schema)
    if (exists) continue
    try {
      await modelCreate.call(this, schema)
    } catch (err) {
      this.log.error('errorOn%s%s', connection.name, err.message)
    }
  }
}

export default instantiate
