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
      return data.data
    })
  },

  postResult: (axios, result) => {
    return axios.post(`${fbDbUrl}/result.json`, { result }).then(data => {
      return data.data.name
    })
  },
  getResultByKey: (axios, key) => {
    return axios.get(`${fbDbUrl}/result/${key}.json`).then(data => {
      console.log(data)
      return data
    })
  },
  getResults: (axios) => {
    return axios.get(`${fbDbUrl}/result.json`).then(data => {
      console.log(data)
      return data
    })
  },
}