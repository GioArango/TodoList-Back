const { Schema, model } = require('mongoose');

const StatusSchema = Schema({
    status: {
        type: String,
        required: [ true, 'The status is required' ]
    }
});

module.exports = model( 'Status', StatusSchema );