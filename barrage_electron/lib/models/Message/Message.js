const { Owner } = require('../Owner')
class Message {
  constructor(options) {
    this.options = options || {}
    this.content = options.content || ''
    this.owner = Owner.init(options.owner)
    this.created = new Date().getTime()
    this.modified = this.created
    this.type = options.type || 'chat'
  }

  static init(options = {}) {
    if (options instanceof Message) {
      return options
    }
    const instance = new Message(options)
    return instance.isValid ? instance : null
  }
  static initFromArray(arr = []) {
    if (Array.isArray(arr)) {
      return arr.map(this.init)
    }
    return []
  }
  static initOnlyValidFromArray(arr = []) {
    return this.initFromArray(arr).filter((i) => i)
  }

  get isValid() {
    return !!this.owner
  }

}

module.exports = { Message }
