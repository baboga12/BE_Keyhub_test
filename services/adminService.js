const Setting = require('../models/settingModel')
const reportBlog = require('../models/retportBlogModel')
const reportUser = require('../models/reportUserModel')
const reportComment = require('../models/reportCommentModel')
const reportTag = require('../models/reportTagModel')
const Blog = require('../models/Blog/blogModel')
const Category = require('../models/Blog/categoryModel')
const Comment = require('../models/Blog/commentModel')
const User = require('../models/usermodel')
const mailService = require('../services/mailService')
const blogService = require('../services/blogService')
const tagService = require('../services/tagService')

class AdminService{
    static addSettingsBlog= async (value) =>{
    const checkSetting = await Setting.findOne({value: value});
    if(checkSetting)
    {
        return 1;
    }
    const setting = new Setting({
        value: value
    });
    return setting.save();
    }
    static editSettingBlog = async (settingId, value) =>{
    const setting = await Setting.findById(settingId);
    const settingList = await Setting.find();
    for(const settingCheck of settingList){
        if(settingCheck._id.equals(setting._id)){
            continue;
        }
        if(settingCheck.value.toLowerCase() === value.toLowerCase())
        {
            return 1;
        }
    }
    setting.value = value;
    await setting.save();
    return setting;
    }
    static deleteSettingBlog = async (settingId) =>{
    const setting = await Setting.findById(settingId);
    if(!setting) return 1;
    await setting.deleteOne();
    return setting;
    }
    static getReportByType(type){
    if(type==='Blog'){
        return reportBlog.find();
    }
    if(type==='User'){
        return reportUser.find();
    }
    if(type==='Comment'){
        return reportComment.find();
    }
    if(type==='Tag'){
        return reportTag.find();
    }
    }
    static evaluateReport = async ( reportId,type,status,authenticatedUser) =>{
        const userAuthenticated = await User.findById(authenticatedUser._id);
        try{
            if(type==='Blog'){
                const report = await reportBlog.findById(reportId);
                if(!report) return 1;
                if(status===true){
                    const blog = await Blog.findById(report.blogIsReported._id);
                    await blogService.deleteBlogById(blog._id,userAuthenticated);
                    await mailService.sendInformDeleteBlog(report.blogIsReported.user.email,report.blogIsReported.title);
                    await report.deleteOne();        
                    return ;        
                }
                else{
                    await report.deleteOne();
                }
                return 0;
            }
            if(type==='Tag'){
                const tagReport = await reportTag.findById(reportId);
                await tagService.deleteTag(tagReport.tagIsReported._id,userAuthenticated);
                const userTag = await User.findById(tagReport.tagIsReported.user._id)
                await mailService.sendInformDeleteTag(userTag.email,tagReport.tagIsReported.name)
                return;
            }
        }
        catch(err){
            console.log(err);
        }
    }
}
module.exports = AdminService;