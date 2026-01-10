async function connSanitizer (item) {
  if (!item.connection) this.fatal('keyIsRequired%s%s', 'connection', item.name, { payload: item })
  if (!item.connection.database) this.fatal('keyIsRequired%s%s', 'connection.database', item.name, { payload: item })
  const { pick } = this.app.lib._
  const newItem = pick(item, ['name', 'type', 'connection'])
  newItem.noTable = true
  return newItem
}

export default connSanitizer
