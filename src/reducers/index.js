import { combineReducers } from 'redux'

import jokes from './jokes'
import userId from './user'

export default combineReducers({
    jokes,
    userId
})