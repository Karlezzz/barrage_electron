const { nanoid } = require("nanoid")

class VoteOption {
  constructor(options) {
    options = options || {}
    this.id = nanoid()
    this.optionValue = options.optionValue
    this.selectMembers = options.selectMembers || []
  }

  get isValid() {
    return !!this.optionValue
  }

  static init(options = {}) {
    if (options instanceof VoteOption) {
      return options
    }
    const instance = new VoteOption(options)
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
}
module.exports = {
  VoteOption
}
