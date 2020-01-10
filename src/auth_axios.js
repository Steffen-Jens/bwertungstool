import auth_axios from 'axios'

const instance = auth_axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance
