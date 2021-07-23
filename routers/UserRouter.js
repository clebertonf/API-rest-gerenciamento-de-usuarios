const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.createUser);
router.get('/', UserController.searchAllUsers);
router.get('/:id', UserController.searchUserById);
router.put('/:id', UserController.editUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
