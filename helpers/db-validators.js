const Status = require('../models/status');
const Todos = require('../models/todo');

const validateStatus = async(status = '') => {
    const existsStatus = await Status.findOne({ status });
    if( !existsStatus ) {
        throw new Error(`The status ${status} is not valid`)
    }
}

const existsTodoById = async( id = '' ) => {
    try {
        const existsTodo = await Todos.findOne({ '_id': id });
        if( !existsTodo ) {
            throw new Error('Todo not exists')
        }        
    } catch (error) {
        throw new Error(error)
    } 
}

const existsUserById = async( id = '' ) => {
    try {
        console.log('UID:', id);
        const existsUser = await Todos.findOne({ 'userId': id });
        if( !existsUser ) {
            throw new Error('User is not valid')
        }        
    } catch (error) {
        throw new Error(error)
    }
}   

module.exports = {
    validateStatus,
    existsTodoById,
    existsUserById
}