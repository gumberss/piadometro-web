import React from 'react'
import socket from 'socket.io-client'

import './Timeline.css'
import smileLogo from '../smile.svg'

import api from '../services/api'
import configuration from '../configurations/configurations'

import Joke from '../components/Joke'

import { handleReceiveJokes, receiveJoke, likeJoke, handleNewJoke } from '../actions/jokes'

import { connect } from 'react-redux'

class Timeline extends React.Component {

    state = {
        content: '',
        context: '',
        author: ''
    }

    async componentDidMount() {

        const { dispatch } = this.props

        dispatch(handleReceiveJokes())

        this.subscribeToEvents()
    }

    subscribeToEvents = () => {

        var serverUrl = process
            ? process.env.serverConnection
            : configuration.serverConnection

        const io = socket(serverUrl)

        const { dispatch } = this.props

        io.on(configuration.events.newJoke, data => dispatch(receiveJoke(data)))

        io.on(configuration.events.likeJoke, data => dispatch(likeJoke(data)))
    }

    handleNewJokeInputChange = event => {
        this.setState({ content: event.target.value })
    }

    handleNewJokeContextInputChange = event => {
        this.setState({ context: event.target.value })
    }

    handleNewJokeAuthorInputChange = event => {
        this.setState({ author: event.target.value })
    }

    handleNewJoke = async event => {
        event.preventDefault()

        const { dispatch } = this.props

        const { content, context, author } = this.state

        const registredBy = localStorage.getItem('@Piadometro:username')

        dispatch(handleNewJoke({
            content,
            context,
            author,
            registredBy
        }))

        this.setState({
            content: '',
            context: '',
            author: ''
        })
    }

    render() {
        const { jokeIds } = this.props

        return (
            <div className="timeline-wrapper" onSubmit={this.handleNewJoke}>
                <img height={24} src={smileLogo} alt="GoTwitter" />

                <form>
                    <textarea
                        value={this.state.content}
                        onChange={this.handleNewJokeInputChange}
                        placeholder="Qual foi a piada contada?"
                    >
                    </textarea>
                    <textarea
                        value={this.state.context}
                        onChange={this.handleNewJokeContextInputChange}
                        placeholder="Qual foi o contexto da piada contada?"
                    >
                    </textarea>

                    <input
                        type="text"
                        placeholder="Quem foi o autor da piada?"
                        value={this.state.author}
                        onChange={this.handleNewJokeAuthorInputChange}
                    />

                    <button type="submit" className="button">Enviar</button>
                </form>

                <div className="jokes-wrapper">
                    <ul className="joke-list">
                        {
                            jokeIds.map(jokeId => (
                                <Joke key={jokeId} jokeId={jokeId} />
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ jokes }) {

    return {
        jokeIds: Object.keys(jokes).sort((a, b) => new Date(jokes[b].createdAt).getTime() - new Date(jokes[a].createdAt).getTime())
    }
}

export default connect(mapStateToProps)(Timeline)