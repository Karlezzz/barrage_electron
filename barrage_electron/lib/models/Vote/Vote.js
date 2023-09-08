const { VoteOption } = require('../VoteOption')
class Vote {
  constructor(options) {
    options = options || {}
    this.created = options.created || (new Date().valueOf())
    this.duration = this.created + options.duration
    this.question = options.question
    this.sections = VoteOption.initFromArray(options.sections) || []
  }

  get isValid() {
    return !!this.question
    && !!this.sections
    && this.sections.length > 2
    && this.created
    && this.duration
  }

  static init(options = {}) {
    if (options instanceof Vote) {
      return options
    }
    const instance = new Vote(options)
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
  Vote
}
