import create from './create.js'
import drop from './drop.js'

async function modelClear ({ schema, options = {} } = {}) {
  await drop.call(this, schema)
  await create.call(this, schema)
  return true
}

export default modelClear
