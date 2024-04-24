const express = require('express');
const middleware = require('../middlewares');
const controller = require('../controller')
const router = express.Router();

router.post('/addSettingBlog',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.addSettingsBlog)
router.post('/addTypeReport',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.addTypeReport)

module.exports = router;
