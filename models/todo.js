
const { Schema, model } = require('mongoose');

const TodoSchema = Schema({
    title: {
        type: String,
        required: [true, 'The title is required']
    },
    description: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    timeSpend: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        required: [true, 'The status is required'],
        enum: ['TODO', 'INPROGRESS', 'DONE']
    }
})

module.exports = model( 'Todo', TodoSchema );