import axios from 'axios'
import configuration from '../configurations/configurations'

var baseUrl = process
    ? process.env.serverUrl
    : configuration.serverUrl

const api = axios.create({
    baseURL: baseUrl
})

export default api