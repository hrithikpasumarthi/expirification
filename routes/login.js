var express = require('express');
var router = express.Router();
const {logincontroller}= require('../Controllers/loginController')
/* GET home page. */
router.post('/',logincontroller);

module.exports = router;
