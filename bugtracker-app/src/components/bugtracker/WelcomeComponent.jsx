import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../API/bugtracker/HelloWorldService.js'

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }
    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                    <div className="container">
                        Welcome {this.props.match.params.name}. 
                        You can manage your bugs <Link to="/bugs">here.</Link>
                    </div>
                    {/*<div className="container">
                        Click here to get a customized welcome message
                        <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                    </div>*/}
                    <div className="container">
                        {this.state.welcomeMessage}
                    </div>
            </div>
        )
    }

    retrieveWelcomeMessage() {
        HelloWorldService.executeHellowWorldPathVariableService(this.props.match.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        this.setState({welcomeMessage: response.data.message})
    }

    handleError(error) {
        let errorMessage = '';
        if(error.message) {
            errorMessage += error.message
        }

        if (error.response && error.response.data) {
            error += error.response.data.message
        }
        
        this.setState({welcomeMessage: errorMessage})
    }
}

export default WelcomeComponent