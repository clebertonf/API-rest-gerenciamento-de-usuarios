const router = require('express').Router();
const LoginController = require('../controllers/loginController');

router.post('/register', LoginController.createUser);
router.post('/authenticate', LoginController.authenticateUser);
router.post('/forgot_password', LoginController.forgotPassword);
router.post('/reset_password', LoginController.resetPassword);

module.exports = router;
