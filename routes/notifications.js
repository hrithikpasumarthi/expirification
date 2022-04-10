const express = require("express")
let router = express.Router();
const {getnotifications,setnotificationscount}= require('../Controllers/notificationsController')
router.get('/get',getnotifications);
router.get('/setcount',setnotificationscount);

module.exports = router;
