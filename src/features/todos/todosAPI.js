import axios from "axios"

export const getTodosAPI = function () {
    return axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
        .then(res => res.json())
}

export const addTodoAPI = function (todo) {
    return axios.post(`https://jsonplaceholder.typicode.com/todos`, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" }
    })
        .then(res => res.json())
}

export const updateTodoAPI = function (todo) {
    return axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" }
    })
        .then(res => res.json())
}

export const deleteTodoAPI = function (id) {
    return axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE"
    })
        .then(() => id)
}
