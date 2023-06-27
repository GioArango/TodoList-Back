
const { Router } = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todos');

const router = Router();

router.get('/', getTodos);

router.post('/', createTodo);

router.put('/:id', updateTodo);

router.delete('/', deleteTodo);

module.exports = router;