const admin = require('firebase-admin');

const validateUser = async( userId = '' ) => {
    try {
        const user = await admin.app().auth().getUser(userId);
    
        if(!user) {
            throw new Error('The user does not exist');
        }
        
    } catch (error) {
        console.error(error);
        throw new Error('Error validating user')
    }
}

module.exports = {
    validateUser
}