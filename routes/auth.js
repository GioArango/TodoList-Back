
const { Router } = require('express');
const { authenticateUser, createUser } = require('../controllers/auth');

const router = Router();

router.post('/login', authenticateUser);
router.post('/create', createUser);

module.exports = router;