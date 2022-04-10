var express = require('express');
var router = express.Router();
const {getproducts,addproducts, expirydate1,expirydate2} = require('../Controllers/productController')
router.post('/',getproducts);
router.post('/add',addproducts);
router.get('/getexpproducts',expirydate2);
module.exports = router;
