const { response } = require('express');
const Todo = require('../models/todo');

const getTodos = async(req, res = response) => {

    try {
        const { limit, from = 0 } = req.query;
        const query = { active: true };
    
        const [ total, todos ] = await Promise.all([
            Todo.countDocuments(query),
            Todo.find(query)
                .skip(Number(from))
                .limit(Number(limit))
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
        console.log('REQ CREATE', req);
        const { title, ...rest } = req.body;
        const todoDB = await Todo.findOne({ title });

        if ( todoDB ) {
            return res.status(400).json({
                msg: `The task ${title} already exists`
            })
        }

        console.log('REQUEST', rest);
        const todo = new Todo( req.body );
    
        await todo.save();
        
        res.json({
            msg: 'post - controller',
            todo
        })        
    } catch (error) {
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
            id
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        })
    }
}

const deleteTodo = async(req, res = response) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndUpdate( id, { active: false });
        res.json({
            id
        })        
    } catch (error) {
        res.status(500).json({
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