const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.info('¡Database connection succesfuly!');
        
    } catch (error) {
        console.error(error);
        throw new Error('Error connecting with database')
    }
}

module.exports = {
    dbConnection
}