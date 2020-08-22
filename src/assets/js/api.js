const apiKey = 'AIzaSyC6Ipr-mynlo5ahKC2_nTCVPCbWYe_mc80' // test key
const fbDbUrl = 'https://threat-vision.firebaseio.com'

export default {
  postKey: (axios, key) => {
    return axios.post(`${fbDbUrl}/keys.json`, { key }).then(data => {
      console.log(data)
      return data
    })
  },
  getKeys: (axios) => {
    return axios.get(`${fbDbUrl}/keys.json`).then(data => {
      console.log(data)
      return data
    })
  },

  postKey: (axios, key) => {
    return axios.post(`${fbDbUrl}/.json`, { key }).then(data => {
      console.log(data)
      return data
    })
  },
  getKeys: (axios) => {
    return axios.get(`${fbDbUrl}/keys.json`).then(data => {
      console.log(data)
      return data
    })
  },

  postNewResult: (axios, post) => {
    return axios.post(`${fbDbUrl}/posts${post.token}.json`, post)
  },
  getResultById: (axios) => {
    return axios.get(`${fbDbUrl}/posts${post.token}.json`)
  },
  deleteAll: (axios) => {
    return axios.delete(`${fbDbUrl}/posts.json`)
  }
}