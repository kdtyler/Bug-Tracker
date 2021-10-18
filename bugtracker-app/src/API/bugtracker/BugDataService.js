import axios from "axios"
import {API_URL, JPA_API_URL} from '../../Constants'

class BugDataService {
    retrieveAllBugs(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/bugs`)
    }

    deleteBug(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/bugs/${id}`)
    }

    retriveBug(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/bugs/${id}`)
    }

    updateBug(name, id, bug) {
        return axios.put(`${JPA_API_URL}/users/${name}/bugs/${id}`, bug)
    }

    createBug(name, id, bug) {
        return axios.post(`${JPA_API_URL}/users/${name}/bugs/}`, bug)
    }
}

export default new BugDataService()