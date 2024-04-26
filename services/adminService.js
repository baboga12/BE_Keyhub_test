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
const commentService = require('../services/commentService')
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
                if(status===true){
                    const tagReport = await reportTag.findById(reportId);
                    await tagService.deleteTag(tagReport.tagIsReported._id,userAuthenticated);
                    const userTag = await User.findById(tagReport.tagIsReported.user._id)
                    await mailService.sendInformDeleteTag(userTag.email,tagReport.tagIsReported.name)
                    await tagReport.deleteOne();
                }
                else{
                    await reportTag.deleteOne();
                }
                return;
            }
            if(type==='User'){
                const report = await reportUser.findById(reportId);
                if(!report) return 1;
                if(status===true){
                    const user = await User.findById(report.userIsReported._id);
                    if(user.sumViolating>=10){
                        user.status = 'locked';
                        await user.save();
                        await mailService.sendInformBlockUser(user.email);
                    }
                    else{
                        user.sumViolating = user.sumViolating + 1;
                        await user.save();
                        await mailService.sendInformWarningUser(user.email,report.reason.value);
                        await report.deleteOne();
                    }
                    return;
                }
                else{
                    await report.deleteOne();
                }
                return 0;
            }
            if(type==='Comment')
            {
                const report = await reportComment.findById(reportId);
                console.log('report', report)
                if(!report) return 1;
                if(status===true){
                    const blog = await Blog.findOne({ comments: report.comment._id }).populate('comments');
                    const comment = await Comment.findById(report.comment._id);
                    await commentService.deleteComment(comment._id,userAuthenticated._id,blog._id)
                    await mailService.sendInformDeleteComment(report.comment.user.email,report.comment.content);
                    await report.deleteOne();        
                    return ;        
                }
                else{
                    await report.deleteOne();
                }
                return 0;
            }
        }
        catch(err){
            console.log(err);
        }
    }
}
module.exports = AdminService;