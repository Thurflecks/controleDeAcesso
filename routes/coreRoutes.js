const express = require('express');
const router = express.Router();
const CoreController = require('../controllers/coreController');

router.get('/', CoreController.home);
router.get('/login', CoreController.login);
router.post('/login', CoreController.loginPost);

router.get('/register', CoreController.register);
router.post('/register', CoreController.registerPost);

module.exports = router;