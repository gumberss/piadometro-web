import axios from 'axios'
import configuration from '../configurations/configurations'

const api = axios.create({
    baseURL: configuration.serverUrl
})

export default api