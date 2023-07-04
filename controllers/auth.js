const admin = require('firebase-admin');

// Configuración de Firebase Admin utilizando las credenciales de servicio
const serviceAccount = require('../serviceAccountKey.json');
const { response } = require('express');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

console.log('Firebase inizializated');

// Ejemplo: Crear un nuevo usuario
const createUser = async (req, res = response) => {
    try {
        const { email, password } = req.body;

        const userRecord = await admin.auth().createUser({
            email,
            password
        });

        res.json({
            uuid: userRecord.uid,
            body: req.body
        });
        console.log('Usuario creado:', userRecord.uid);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            msg: error.message
        })
    }
};

// Ejemplo: Autenticar un usuario por correo electrónico y contraseña
const authenticateUser = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const userRecord = await admin.auth().getUserByEmail(email);
        // Verificar si el usuario está deshabilitado
        if (!userRecord.disabled) {
            const isAuth = await admin.auth().signInWithEmailAndPassword(email, password);
            console.log('AUTH', isAuth);

            res.json({
                uid: userRecord.uid
            });
            console.log('Usuario autenticado exitosamente');
        } else {
            console.log('El usuario está deshabilitado');
            res.status(401).json({
                msg: 'El usuario está deshabilitado'
            })
        }
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).json({
            msg: error.message
        })
    }
};

// Llamar a las funciones según sea necesario
module.exports = {
    createUser,
    authenticateUser
}