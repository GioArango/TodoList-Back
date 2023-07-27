const { response } = require('express');
const Todo = require('../models/todo');

const getTodos = async(req, res = response) => {

    try {
        const { limit, from = 0, status } = req.query;
        const { userId } = req.body;
        const query = { active: true, status, userId };
    
        const [ total, todos ] = await Promise.all([
            Todo.countDocuments(query),
            Todo.find(query)
                .skip(Number(from))
                .limit(Number(limit)),
        ])
    
        res.json({
            total,
            todos
        })       
    } catch (error) {
        res.status(500).json({
            msg: error
        })
    }

}

const createTodo = async(req, res = response) => {    
    try {
        const { title, ...rest } = req.body;
        const existingTodo = await Todo.find({ title });

        if ( existingTodo ) {
            const isActiveTask = existingTodo.some((todo) => todo.active);
            if (isActiveTask) {
                return res.status(400).json({
                    msg: `The task ${title} already exists`
                })
            }
        }

        console.log('REQUEST', rest);
        const todo = new Todo( req.body );
    
        await todo.save();
        
        res.json({
            msg: 'successfully created task',
            id: todo._id
        })        
    } catch (error) {
        console.log('ERROR', error);
        res.status(500).json({
            msg: error
        })
    }
}

const updateTodo = async(req, res = response) => {    
    try {
        const { id } = req.params;
        const { userId, _id, ...rest } = req.body;
        await Todo.findByIdAndUpdate( id, rest );
    
        res.json({
            msg: 'successfully updated task',
            id
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error
        })
    }
}

const deleteTodo = async(req, res = response) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndUpdate( id, { active: false });
        res.json({
            msg: 'successfully deleted task',
            id
        })        
    } catch (error) {
        return res.status(500).json({
            msg: error
        })
    }
}


module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}