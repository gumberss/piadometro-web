import React from 'react'
import { connect } from 'react-redux'


import configuration from '../configurations/configurations'
import api from '../services/api'

import like from '../like.svg'
import './Joke.css'

class Joke extends React.Component {

    handleLike = async () => {
        const { jokeId } = this.props

        await api.post(`${configuration.request.likes}/${jokeId}`)
    }

    render() {

        const { jokeId, jokes } = this.props

        const joke = jokes[jokeId]

        return (
            <li className="joke">
                <strong>Autor: {joke.author}</strong>
                <p>Piada: {joke.content}</p>
                <p>Contexto: {joke.context}</p>
                <p>Registrado por: {joke.registredBy}</p>
                <button type="button" onClick={this.handleLike}>
                    <img src={like} alt="Like" />
                    {joke.likes}
                </button>
            </li>
        )
    }
}   

function mapStateToProps({ jokes }) {
    return {
        jokes
    }
}

export default connect(mapStateToProps)(Joke)