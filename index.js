async function factory (pkgName) {
  const me = this

  return class DoboCouchdb extends this.lib.BajoPlugin {
    constructor () {
      super(pkgName, me.app)
      this.alias = 'dbcouch'
      this.dependencies = ['dobo']
      this.config = {}
    }
  }
}

export default factory
