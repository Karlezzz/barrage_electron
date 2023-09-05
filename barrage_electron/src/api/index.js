import store from '@/store/index'

async function _createOne(url, body) {
  const result = await store.dispatch('axios/createOne', {
    url,
    body,
  })
  return result.total === 1 ? result.data[0] : null
}

async function _findAll(url, options) {
  const result = await store.dispatch('axios/findAll', {
    url,
    query: {
      active: true,
      deleted: false,
      ...options,
    },
  })
  return result.data || []
}
async function _findOne(url, options) {
  const result = await store.dispatch('axios/findAll', {
    url,
    query: {
      // active: true,
      // deleted: false,
      ...options,
    },
  })
  return result.total === 1 ? result.data[0] : null
}

async function _updateOne(url, body) {
  const result = await store.dispatch('axios/updateOne', {
    url,
    body,
  })
  return result.total === 1 ? result.data[0] : null
}

export {
  _findAll,
  _findOne,
  _createOne,
  _updateOne,
}



// import axios from 'axios';

// const requests = axios.create({
//   baseURL: "http://localhost:3000",
//   timeout: 10000
// })
// requests.interceptors.response.use(config => {
//   return config;
// })
// requests.interceptors.request.use(config => {
//   return config;
// })
// export default requests;

// export const reqUserLogin = (data) => requests({
//   url: '/user',
//   method: 'post',
//   data
// })
