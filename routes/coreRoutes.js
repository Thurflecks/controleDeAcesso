const express = require('express');
const router = express.Router();
const CoreController = require('../controllers/coreController');
const verifyNivel = require('../middlewares/verifyNivel');

router.get('/', CoreController.home);
router.get('/login', CoreController.login);
router.post('/login', CoreController.loginPost);
router.get('/testar', verifyNivel([2, 3]), CoreController.acesso);

router.get('/register', CoreController.register);
router.post('/register', CoreController.registerPost);

module.exports = router;