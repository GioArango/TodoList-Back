
const { Schema, model } = require('mongoose');

const TodoSchema = Schema({
    title: {
        type: String,
        required: [true, 'The title is required'],
        // unique: true
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: {
        type: Date,
        default: new Date()
    },
    timeSpend: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'TODO',
        required: [true, 'The status is required'],
        // enum: ['TODO', 'INPROGRESS', 'DONE']
    },
    userId: {
        type: String,
        required: [true, 'The userId is required']
    }
})

TodoSchema.methods.toJSON = function() {
    const { __v, ...todo } = this.toObject();
    return todo;
}

module.exports = model( 'Todo', TodoSchema );