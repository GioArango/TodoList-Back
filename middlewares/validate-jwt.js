const admin = require('firebase-admin');

const { response } = require("express");


const validateJWT = async( req, res = response, next) => {

    const token = req.header('x-token');
    console.log('TOKEN:', token);

    if (!token) {
        res.status(400).json({
            ok: false,
            msg: "The token is required"
        })
    }

    try {
        const { uid } = await admin.app().auth().verifyIdToken(token);

        req.body.userId = uid;
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Internal Server Error"
        })
    }

    next();
}

module.exports = {
    validateJWT
}