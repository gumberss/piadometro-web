import { USER_ID }  from '../actions/user'

export default function userReducer(state = null, action){

    switch(action.type){
        case USER_ID:
            return action.userId

        default: 
            return state
    }
}