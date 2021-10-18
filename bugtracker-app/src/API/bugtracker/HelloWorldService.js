import axios from "axios"

class HelloWorldService {
    executeHellowWorldService() {
        return axios.get('http://localhost:8080/hello-world')
    }

    executeHellowWorldBeanService() {
        return axios.get('http://localhost:8080/hello-world-bean')
    }

    executeHellowWorldPathVariableService(name) {
        //let username = 'kdtyler'
        //let password = 'dummy'

        //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password) // btoa does basic 64 encoding

        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`)
    }

}

export default new HelloWorldService()