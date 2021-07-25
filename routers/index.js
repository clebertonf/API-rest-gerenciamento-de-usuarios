const router = require('express').Router();
const UserRouter = require('./UserRouter');
const LoginRouter = require('./LoginRouter');

router.use('/login', LoginRouter);
router.use('/user', UserRouter);

module.exports = router;
