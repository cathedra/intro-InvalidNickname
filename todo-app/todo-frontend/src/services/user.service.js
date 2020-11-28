import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/todos/';

class UserService {

    async createTodo(task, date) {
        const {data: newTodo} = await axios.post(API_URL, {task, date}, {headers: authHeader()})
        return newTodo
    }

    async deleteTodo(id) {
        return await axios.delete(`${API_URL}${id}`, {headers: authHeader()})
    }

    async updateTodo(id, payload) {
        const {data: newTodo} = await axios.put(`${API_URL}${id}`, payload, {headers: authHeader()})
        return newTodo
    }

    async getAllTodos() {
        const {data: todos} = await axios.get(API_URL, {headers: authHeader()})
        return todos
    }
}

export default new UserService();