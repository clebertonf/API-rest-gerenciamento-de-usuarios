const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/', UserController.createUser);
router.get('/', UserController.searchAllUsers);
router.get('/:id', UserController.createUser);

module.exports = router;
