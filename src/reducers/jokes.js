import { ADD_JOKE, RECEIVE_JOKES, LIKE_JOKE } from '../actions/jokes'

export default function jokesReducer(state = {}, action) {

    switch (action.type) {
        case ADD_JOKE:
            return {
                ...state,
                [action.joke._id]: action.joke
            }
        case RECEIVE_JOKES:

            var reduced = action.jokes.reduce((accumulator, current) => {
                accumulator[current._id] = current
                return accumulator
            }, [])

            return {
                ...state,
                ...reduced
            }
        case LIKE_JOKE:
            return {
                ...state,
                [action.joke._id]: action.joke
            }

        default:
            return state
    }
}


