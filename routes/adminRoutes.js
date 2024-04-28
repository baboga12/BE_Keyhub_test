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


router.get('/:type/listReport',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.getListReportByType)
router.get('/allBlog',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.getALlBlog)
router.get('/allTag',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.getAllTag)
router.get('/allCategory',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.getAllCategory)
router.get('/allUser',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.getAllUser)
router.get('/allUserBlocked',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.getAllUserBlocked)




router.post('/evaluateReport',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.evaluateReport)
router.post('/openAccount',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.openAccount)
router.post('/decentralization',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.decentralization)



router.delete('/:blogId/deleteBlog',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.deleteBlogById)
router.delete('/:tagId/deleteTag',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.deleteTags)
// router.delete('/:categoryId/deleteCategory',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.dele)


module.exports = router;
