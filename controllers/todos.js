const { response } = require('express');

const getTodos = (req, res = response) => {
    res.json({
        msg: 'get - controller'
    })
}

const createTodo = (req, res = response) => {
    console.log(req.body);
    res.json({
        msg: 'post - controller'
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