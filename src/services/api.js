import axios from 'axios'
import configuration from '../configurations/configurations'

const api = axios.create({
    baseURL: process.env.serverConnection
})

export default api