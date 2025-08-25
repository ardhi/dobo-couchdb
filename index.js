async function factory (pkgName) {
  const me = this

  class DoboCouchdb extends this.lib.Plugin {
    static alias = 'dbcouch'
    static dependencies = ['dobo']

    constructor () {
      super(pkgName, me.app)
      this.config = {}
    }
  }

  return DoboCouchdb
}

export default factory
