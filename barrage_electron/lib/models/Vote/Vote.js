const { nanoid } = require('nanoid')
const { VoteOption } = require('../VoteOption')
class Vote {
  constructor(options) {
    options = options || {}
    this.id = options.id || nanoid()
    this.created = options.created || (new Date().valueOf())
    this.duration = options.duration
    this.endTime = this.created + options.duration
    this.question = options.question
    this.voteOptions = VoteOption.initFromArray(options.voteOptions) || []
  }

  get isValid() {
    return !!this.question
    && !!this.voteOptions
    && this.voteOptions.length >= 2
    && this.created
    && this.duration
  }

  isInValidTime() {
    const now = new Date().valueOf()
    return now <= this.endTime ? true : false
  }

  remainingTime() {
    const remainingTime = this.endTime - new Date().valueOf()
    if (remainingTime < 0) return `Completed`
    const min = new Date(remainingTime).getMinutes() < 10 ? `0${new Date(remainingTime).getMinutes()}` : new Date(remainingTime).getMinutes()
    const second = new Date(remainingTime).getSeconds() < 10 ? `0${new Date(remainingTime).getSeconds()}` : new Date(remainingTime).getSeconds()
    return `00 : ${min} : ${second}`
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
