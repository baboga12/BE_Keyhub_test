const User = require('../models/usermodel')
const Setting = require('../models/settingModel')
const Service = require('../services');

const addSettingsBlog = async(req, res)=>{
    try{
        const value = req.body.value;
        if(!value)
        {
            console.log('Value is required');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is required',
                result: null,
            });
        }
        const setting = await Service.adminService.addSettingsBlog(value);
        if(setting===1)
        {
            console.log('Value is existing');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is existing',
                result: null,
            });
        }
        console.error('Add Setting Success');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Add Setting Success',
            result: setting,
        });
    }
    catch (error) {
        console.error('Error verifying user:', error);
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
}
const editSettingsBlog = async(req, res)=>{
    try{
        const {settingId,value} = req.body;
        if(!value)
        {
            console.log('Value is required');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is required',
                result: null,
            });
        }
        const setting = await Service.adminService.editSettingBlog(settingId,value);
        if(setting===1)
        {
            console.log('Value is existing');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is existing',
                result: null,
            });
        }
        console.error('Edit Setting Success');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Edit Setting Success',
            result: setting,
        });
    }
    catch (error) {
        console.error('Error verifying user:', error);
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
}
const deleteSettingBlog = async(req, res) => {
    const settingId = req.body.settingId;
    if(!settingId) {
        console.log('SettingId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'SettingId is required',
            result: null,
        });
    }
    const deleteSettingBLog = await Service.adminService.deleteSettingBlog(settingId);
    if(deleteSettingBLog===1){
        console.log('Not found Setting');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found Setting',
            result: null,
        });
    }
    console.error('Delete Setting Success');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Delete Setting Success',
        result: null,
    });
}
const addTypeReport = async(req, res)=>{
    try{
        const value = req.body.value;
        if(!value)
        {
            console.log('Value is required');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is required',
                result: null,
            });
        }
        const setting = await Service.reportService.addTypeReport(value);
        if(setting===1)
        {
            console.log('Value is existing');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is existing',
                result: null,
            });
        }
        console.error('Add Setting Success');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Add Setting Success',
            result: setting,
        });
    }
    catch (error) {
        console.error('Error verifying user:', error);
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
}
const editTypeReport = async(req, res)=>{
    try{
        const {reportId,value} = req.body;
        if(!value)
        {
            console.log('Value is required');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is required',
                result: null,
            });
        }
        if(!reportId)
        {
            console.log('ReportId is required');
            console.log('--------------------------------------------------------------------------------------------------------------------');
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'ReportId is required',
                result: null,
            });
        }
        const setting = await Service.reportService.editTypeReport(reportId,value);
        if(setting===1)
        {
            console.log('Not found report');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Not found report',
                result: null,
            });
        }
        if(setting===2)
        {
            console.log('Value is existing');
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Value is existing',
                result: null,
            });
        }
        console.error('Edit Setting Success');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Edit Setting Success',
            result: setting,
        });
    }
    catch (error) {
        console.error('Error verifying user:', error);
        console.log('--------------------------------------------------------------------------------------------------------------------')
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
}
const deleteTypeReport = async (req, res) => {
    const reportId = req.body.reportId;
    if(!reportId) {
        console.log('ReportId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'ReportId is required',
            result: null,
        });
    }
    const deleteReport = await Service.reportService.deleteTypeReport(reportId);
    if(deleteReport===1){
        console.log('Not found report');
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found report',
            result: null,
        });
    }
    console.error('Delete Setting Success');
    console.log('--------------------------------------------------------------------------------------------------------------------')
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Delete Setting Success',
        result: null,
    });
}
const getListReportByType = async(req,res) =>{
    const type = req.params.type;
    const listReport = await Service.adminService.getReportByType(type);
    if(type==='Blog')
    {
        console.log('List report blog');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'List report blog',
            result: listReport,
        });
    }
    if(type==='User')
    {
        console.log('List report user');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'List report user',
            result: listReport,
        });
    }
    if(type==='Tag'){
        console.log('List report tag');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'List report tag',
            result: listReport,
        });
    }
    if(type==='Comment'){
        console.log('List report comment');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'List report comment',
            result: listReport,
        });
    }
}
const getALlBlog = async (req, res) => {
    const listBlog = await Service.blogService.getAllBlog();
    console.log('List all blog');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List all blog',
        result: listBlog,
    });
}
const getAllTag = async (req, res) => {
    const listTag = await Service.tagService.getAllTags();
    console.log('List all tag');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List all tag',
        result: listTag,
    });
}
const getAllCategory = async (req, res) => {
    const listCategory = await Service.categoryService.getAllCategory();
    console.log('List all category');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List all category',
        result: listCategory,
    });
}
const getAllUser = async (req, res) => {
    const listUser = await Service.userService.getAllUser();
    console.log('List all user');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'List all user',
        result: listUser,
    });
}
const evaluateReport = async (req, res) => {
    const {reportId,type,status} = req.body;
    const authenticatedUser = req.user;
    if(!reportId)
    {
        console.log('ReportId is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'ReportId is required',
            result: null,
        });
    }
    if(!type)
    {
        console.log('Value is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Value is required',
            result: null,
        });
    }
    if(!status){
        console.log('Status is required');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Status is required',
            result: null,
        });
    }
    try {
    const evaluate = await Service.adminService.evaluateReport(reportId,type,status, authenticatedUser.user);
    if(evaluate===1)
    {
        console.log('Not found report');
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Not found report',
            result: null,
        });
    }
    console.log('Evaluate successfully');
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Evaluate successfully',
        result: null,
    });
    } catch (error) {
        console.log('Internal Server Error: ', error);
        console.log('--------------------------------------------------------------------------------------------------------------------');
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            result: null,
        });
    }
}
module.exports = {
    addSettingsBlog,
    addTypeReport,editSettingsBlog,
    editTypeReport,
    deleteSettingBlog,
    deleteTypeReport,
    getListReportByType,
    getALlBlog,
    getAllTag,
    getAllCategory,getAllUser,
    evaluateReport
}