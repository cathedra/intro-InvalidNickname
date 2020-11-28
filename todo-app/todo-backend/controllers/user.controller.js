const db = require("../models");

function success(res, payload) {
    return res.status(200).json(payload)
}

exports.getTodos = async (req, res, next) => {
    console.log('get /todos')
    try {
        const todos = await db.Todo.find({})
        return success(res, todos)
    } catch (err) {
        console.log('failed to get /todos')
        next({status: 400, message: "failed to get todos"})
    }
};

exports.postTodo = async (req, res, next) => {
    try {
        console.log(req.body)
        const todo = await db.Todo.create(req.body)
        return success(res, todo)
    } catch (err) {
        next({status: 400, message: "failed to create todo"})
    }
}

exports.editTodo = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        return success(res, todo)
    } catch (err) {
        next({status: 400, message: "failed to update todo"})
    }
}

exports.deleteTodo = async (req, res, next) => {
    try {
        await db.Todo.findByIdAndRemove(req.params.id)
        return success(res, "todo deleted!")
    } catch (err) {
        next({status: 400, message: "failed to delete todo"})
    }
}