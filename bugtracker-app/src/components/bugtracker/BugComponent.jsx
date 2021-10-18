import React, {Component} from 'react'
import moment from 'moment'
import {Field, Form, Formik, ErrorMessage} from 'formik'
import BugDataService from '../../API/bugtracker/BugDataService.js'
import AuthenticationService from './AuthenticationService.js'

class BugComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }


    onSubmit(values) {
        let user = AuthenticationService.getLoggedInUsername()

        let bug = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) { // new bug
            BugDataService.createBug(user, bug)
             .then(() => this.props.history.push('/bugs'))
        } else { // existing bug
            BugDataService.updateBug(user, this.state.id, bug)
             .then(() => this.props.history.push('/bugs'))
            //this.props.history.push(`/welcome/${this.state.username}`) // old code?
            console.log(values)
        }
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters in Description'
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }
        return errors
    }

    componentDidMount() {

        if(this.state.id===-1) {
            return
        }

        let user = AuthenticationService.getLoggedInUsername()
        BugDataService.retriveBug(user, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    render() {
        let {description, targetDate} = this.state
        return (
            <div> 

                <h1>Bug</h1>
                <div className="container">
                    <Formik
                        initialValues = {{description,targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}

                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

}

export default BugComponent