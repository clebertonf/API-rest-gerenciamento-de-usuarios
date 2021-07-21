const router = require('express').Router();
const IndexAplicattion = require('../controllers/IndexAplicattion');

router.get('/', IndexAplicattion.userIndex);

module.exports = router;
