const router = require('express').Router();
const UserController = require('../controllers/UserController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/register', UserController.createUser);
router.post('/authenticate', UserController.authenticateUser);
router.post('/forgot_password', UserController.forgotPassword);

router.get('/', UserController.searchAllUsers);
router.get('/:id', UserController.searchUserById);
router.put('/:id', UserController.editUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
