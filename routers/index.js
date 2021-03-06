const router = require('express').Router();
const UserRouter = require('./UserRouter');
const LoginRouter = require('./LoginRouter');
const authenticate = require('../middlewares/authMiddleware');

router.use('/login', LoginRouter);
router.use('/user', authenticate, UserRouter);

module.exports = router;
