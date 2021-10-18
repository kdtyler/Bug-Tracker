import React, {Component} from 'react'
import BugDataService from '../../API/bugtracker/BugDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListBugsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bugs: [],
            message: null
        }

        this.deleteBugClicked = this.deleteBugClicked.bind(this)
        this.updateBugClicked = this.updateBugClicked.bind(this)
        this.addBugClicked = this.addBugClicked.bind(this)
        this.refreshBugs = this.refreshBugs.bind(this)
    }

    componentWillUnmount() {
        console.log('Component unmounted')
    }

    // Testing and learning shouldComponentUpdate
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }


    componentDidMount() {
        this.refreshBugs()
    }

    refreshBugs() {
        let user = AuthenticationService.getLoggedInUsername()
        BugDataService.retrieveAllBugs(user)
        .then(
            response => {
                //console.log(response)
                this.setState({bugs : response.data})
            }
        )
    }

    deleteBugClicked(id) {
        let user = AuthenticationService.getLoggedInUsername()
        //console.log(id + " " + user)
        BugDataService.deleteBug(user, id)
        .then (
            response => {
                this.setState({message: `Delete of bug ${id} successful.`})
                this.refreshBugs()
            }
        )
    }

    updateBugClicked(id) {
        console.log('update' + id)

        // /bugs/id/${id}
        this.props.history.push(`/bugs/${id}`)
    }

    addBugClicked() {
        this.props.history.push(`/bugs/-1`)
    }

    render() {
        return (
            <div>
                <h1>Bug List</h1>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Resolved?</th>
                                <th>Update</th>
                                <th> Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                         this.state.bugs.map (
                             bug =>                    
                                <tr key={bug.id}>
                                    <td>{bug.description}</td>
                                    <td>{moment(bug.targetDate).format('YYYY-MM-DD')}</td>
                                    <td>{bug.isDone.toString()}</td>
                                    <td><button className="btn btn-success" onClick={() => this.updateBugClicked(bug.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteBugClicked(bug.id)}>Delete</button></td>
                                </tr>
                        )
                        }
                    </tbody>
                </table>
                <div class="row">
                        <button className="btn btn-success" onClick={this.addBugClicked}>Add</button>
                </div>
                </div>
            </div>
        )
    }
}

export default ListBugsComponent