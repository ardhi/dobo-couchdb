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
  class DoboCouchdb extends this.app.baseClass.Base {
    constructor () {
      super(pkgName, me.app)
      this.config = {}
      this.drivers = [{
        name: 'couchdb',
        idField: {
          name: '_id'
        }
      }, {
        name: 'pouchdb',
        idField: {
          name: '_id'
        }
      }]
    }
  }

  return DoboCouchdb
}

export default factory
