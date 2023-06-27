const { response } = require('express');
const Todo = require('../models/todo');

const getTodos = (req, res = response) => {
    res.json({
        msg: 'get - controller'
    })
}

const createTodo = async(req, res = response) => {
    const body = req.body
    const todo = new Todo( body );

    await todo.save();
    
    res.json({
        msg: 'post - controller',
        todo
    })
}

const updateTodo = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: 'update - controller',
        id
    })
}

const deleteTodo = (req, res = response) => {
    res.json({
        msg: 'delete - controller'
    })
}


module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}