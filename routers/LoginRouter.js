const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.createUser);
router.post('/authenticate', UserController.authenticateUser);
router.post('/forgot_password', UserController.forgotPassword);
router.post('/reset_password', UserController.resetPassword);

module.exports = router;
