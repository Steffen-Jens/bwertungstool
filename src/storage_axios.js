import storage_axios from 'axios'

const instance = storage_axios.create({
  baseURL: 'gs://b-wertung.appspot.com'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance
