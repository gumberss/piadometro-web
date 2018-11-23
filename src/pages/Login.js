import React from 'react'
import { connect } from 'react-redux'

import './Login.css'
import smileLogo from '../smile.svg'

import { receiveUserId } from '../actions/user'


 class Login extends React.Component {

    state = {
        username: ''
    }

    handleInputChange = event => {

        const { value } = event.target

        this.setState({
            username: value
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { username } = this.state

        if(!username.length) return;

        this.props.dispatch(receiveUserId(username))

        localStorage.setItem('@Piadometro:username', username)

        this.props.history.push('/timeline')
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={smileLogo} alt="Piadometro" />
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        placeholder="Nome do usuário"
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        )
    }
}

export default connect()(Login)