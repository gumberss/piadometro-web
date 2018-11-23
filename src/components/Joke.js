import React from 'react'
import { connect } from 'react-redux'

import configuration from '../configurations/configurations'
import api from '../services/api'

import like from '../like.svg'
import './Joke.css'

import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'

class Joke extends React.Component {

    handleLike = async () => {
        const { jokeId, userId } = this.props

        await api.post(`${configuration.request.likes}`, {
            userId,
            jokeId
        })
    }

    render() {

        const { userId, jokeId, jokes } = this.props

        const joke = jokes[jokeId]

        return (
            <li className="joke">
                <strong>Autor: {joke.author}</strong>
                <p>Contexto: {joke.context}</p>
                <p>Piada: {joke.content}</p>
                <p>Registrado por: {joke.registredBy}</p>

                <button type="button" onClick={this.handleLike}>
                {joke.likes.includes(userId) 
                    ? <TiHeartFullOutline size={20} color="#e0245e" />
                    : <TiHeartOutline size={20} /> }
                    {joke.likes.length}
                </button>
            </li>
        )
    }
}   

function mapStateToProps({ jokes, userId }) {
    
    return {
        jokes,
        userId
    }
}

export default connect(mapStateToProps)(Joke)