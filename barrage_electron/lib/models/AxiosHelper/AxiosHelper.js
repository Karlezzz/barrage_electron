const axios = require('axios')
const path = require('path')
const fs = require('fs')
const { ip, port } = getIpInfo()

function getIpInfo() {
  let fileUrl
  if(process.env.NODE_ENV === 'development') {
    fileUrl = path.resolve(__dirname, '../../../../../../dist_electron/ipAddress.json') //develop
  } else {
    fileUrl = path.resolve(__dirname, '../json/ipAddress.json') //production
  }
  const fileDataJson = fs.readFileSync(fileUrl, 'utf-8')
  const fileData = JSON.parse(fileDataJson)
  const { ip, port } = fileData
  return {
    ip,
    port
  }
}

const baseURL = `http://${ip}:${port}`
const _axios = axios.create({
  baseURL,
  timeout: 10000
})

class AxiosHelper {
  constructor(options) {
    options = options || {}
  }

  static init(options) {
    return new AxiosHelper(options)
  }

  get(url, query) {
    if (typeof query === 'undefined') {
      query = null
    }
    return new Promise((resolve, reject) => {
      return _axios.get(url, {
        params: query
      }).then(resolve).catch(reject)
    })
  }

  async post(url, data, config) {
    if (typeof config === 'undefined') {
      config = null
    }
    return new Promise((resolve, reject) => {
      return _axios.post(url, data, config).then(resolve).catch(reject)
    })
  }

  put(url, data, config) {
    if (typeof config === 'undefined') {
      config = null
    }
    return new Promise((resolve, reject) => {
      return _axios.put(url, data, config).then(resolve).catch(reject)
    })
  }

  async createOne({ url, body, config }) {
    const response = await this.post(url, body, config)
    if (response && response.data) {
      return response.data
    }
    throw new Error('failed')
  }

  async findAll({ url, query }) {
    const response = await this.get(url, query)
    if (response && response.data) {
      return response.data
    }
    throw new Error('failed')
  }

  async findOne({ url, query }) {
    if (query.id) url = `${url}/${query.id}`

    const response = await this.get(url, query)
    if (response && response.data) {
      return response.data
    }
    throw new Error('failed')
  }

  async saveAll({ url, body, config }) {
    const response = await this.put(url, body, config)
    if (response && response.data) {
      return response.data
    }
    throw new Error('failed')
  }

  async updateOne({ url, body, config }) {
    if (body.id) {
      url = `${url}/${body.id}`
    }
    const response = await this.put(url, body, config)
    if (response && response.data) {
      return response.data
    }
    throw new Error('failed')
  }
}

module.exports = {
  AxiosHelper,
  _axios
}


