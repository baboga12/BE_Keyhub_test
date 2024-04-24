const express = require('express');
const middleware = require('../middlewares');
const controller = require('../controller')
const router = express.Router();

router.post('/addSettingBlog',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.addSettingsBlog)
router.post('/deleteSettingBlog',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.deleteSettingBlog)
router.patch('/editSettingBlog',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.editSettingsBlog)
router.post('/addTypeReport',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.addTypeReport)
router.post('/deleteTypeReport',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.deleteTypeReport)
router.patch('/editTypeReport',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.editTypeReport)


module.exports = router;
