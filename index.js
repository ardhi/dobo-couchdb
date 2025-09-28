/**
 * Plugin factory
 *
 * @param {string} pkgName - NPM package name
 * @returns {class}
 */
async function factory (pkgName) {
  const me = this

  /**
   * DoboCouchdb class
   *
   * @class
   */
  class DoboCouchdb extends this.app.pluginClass.base {
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
