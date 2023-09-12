const { AxiosHelper } = require("../../../lib/models/AxiosHelper")

const state = {
  axiosHelper: AxiosHelper.init()
}

const actions = {
  createOne({ state }, { url, body, config }) {
    return state.axiosHelper.createOne({ url, body, config })
  },

  findAll({ state }, { url, query }) {
    return state.axiosHelper.findAll({ url, query })
  },

  findOne({ state }, { url, query }) {
    return state.axiosHelper.findOne({ url, query })
  },

  updateOne({ state }, { url, body, config }) {
    return state.axiosHelper.updateOne({ url, body, config })
  },

}

export default {
  namespaced: true, state, actions
}
