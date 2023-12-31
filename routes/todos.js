
const { Router } = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todos');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateStatus, existsTodoById } = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateUser } = require('../helpers/firebase-validators');


const router = Router();

router.get('/', [
    validateJWT,
    check('userId').custom( validateUser ),
    validateFields
],getTodos);

router.post('/', [
    validateJWT,
    check('userId').custom( validateUser ),
    check('title', 'The title is required').not().isEmpty().isLength({ min: 4 }).withMessage('The title allows a minimum of 6 characters'),
    check('status').custom( validateStatus ),
    // check('userId', 'The userId is required').not().isEmpty(),
    validateFields
], createTodo);

router.put('/:id', [
    validateJWT,
    check('userId').custom( validateUser ),
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom( existsTodoById ),
    // check('userId').not().isEmpty().withMessage('The userId is required').custom( existsUserById ),
    validateFields
], updateTodo);

router.delete('/:id', [
    validateJWT,
    check('userId').custom( validateUser ),
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom( existsTodoById ),
    // check('userId').not().isEmpty().withMessage('The userId is required').custom( existsUserById ),
    validateFields
], deleteTodo);

module.exports = router;