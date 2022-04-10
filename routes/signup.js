var express = require('express');
const { signupcontroller } = require('../Controllers/signupController');
var router = express.Router();

/* GET users listing. */
router.post('/',signupcontroller);


module.exports = router;
