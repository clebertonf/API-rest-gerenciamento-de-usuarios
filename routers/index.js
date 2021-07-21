const router = require('express').Router();
const UserRouter = require('./UserRouter');
const IndexAplicattion = require('./IndexAplicattion');

router.use('/', IndexAplicattion);
router.use('/user', UserRouter);

module.exports = router;
