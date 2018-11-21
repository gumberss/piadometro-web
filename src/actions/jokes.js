import configuration from '../configurations/configurations'
import api from '../services/api'

export const ADD_JOKE = 'ADD_JOKE'
export const RECEIVE_JOKES = 'RECEIVE_JOKES'
export const LIKE_JOKE = 'LIKE_JOKE'
export const REMOVE_JOKE = 'REMOVE_JOKE'

function receiveJokes(jokes) {
    return {
        type: RECEIVE_JOKES,
        jokes
    }
}

function removeJoke(joke) {
    return {
        type: REMOVE_JOKE,
        id: joke._id
    }
}

export function receiveJoke(joke) {
    console.log('receiveJoke', joke)
    return {
        type: ADD_JOKE,
        joke
    }
}

export function likeJoke(joke) {
    return {
        type: LIKE_JOKE,
        joke
    }
}

export function handleReceiveJokes() {
    return async dispatch => {
        const response = await api.get(configuration.request.jokes)

        dispatch(receiveJokes(response.data))
    }
}

export function handleNewJoke(joke) {
    return dispatch => {
        
        return api.post(configuration.request.jokes, joke)
            .catch(error => {
                console.log(error)
            })
    }
}