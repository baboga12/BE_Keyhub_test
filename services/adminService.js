const Setting = require('../models/settingModel')
const reportBlog = require('../models/retportBlogModel')
const reportUser = require('../models/reportUserModel')
const reportComment = require('../models/reportCommentModel')
const reportTag = require('../models/reportTagModel')
const Blog = require('../models/Blog/blogModel')
const Category = require('../models/Blog/categoryModel')
const Comment = require('../models/Blog/commentModel')
const Tag = require('../models/Blog/tagModel')
const User = require('../models/usermodel')
const mailService = require('../services/mailService')
const blogService = require('../services/blogService')
const tagService = require('../services/tagService')
const commentService = require('../services/commentService')
const { categoryService } = require('.')
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
                    await reportBlog.deleteMany({blogIsReported: blog._id});        
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
                if(!report) return 1;
                if(status===true){
                    const blog = await Blog.findOne({ comments: report.comment._id }).populate('comments');
                    const comment = await Comment.findById(report.comment._id);
                    await commentService.deleteComment(comment._id,userAuthenticated._id,blog._id)
                    await mailService.sendInformDeleteComment(report.comment.user.email,report.comment.content);
                    await reportComment.deleteMany({comment: comment._id})        
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
    static deleteBlogById= async (blogId,authenticatedUser)=>{
        const blog = await Blog.findById(blogId);
        const userAuthenticated = await User.findById(authenticatedUser._id);
        if(!blog) return 1;
        await mailService.sendInformDeleteBlog(blog.user.email,blog.title);
        await blogService.deleteBlogById(blog._id, userAuthenticated);
        return 0;
    }
    static getAllUserIsBlock = async ()=>{
        const users = await User.find({status: 'locked'});
        return users;
    }
    static openAccount = async (userId)=>{
        const user = await User.findById(userId);
        if(!user) return 1;
        user.status = 'completed';
        await user.save();
        await mailService.sendInformOpenAccount(user.email, user.name);
        return 0;
    }
    static decentralization = async (userId, role )=>{
        const user = await User.findById(userId);
        if(!user) return 1;
        user.roles = role;
        await user.save();
        return User.findById(user._id);
    }
    static autoFilterBlog = async ()=>{
        const settingBlog = await Setting.find();
        for(const setting of settingBlog){
            const regex = new RegExp(setting.value, 'i');
            console.log(regex)
            const query = await Blog.find({
                        $or: [
                            { title: regex },
                            { description: regex },
                            { content: regex }
                        ]
            })
            if(query.length>0){
                for(const blog of query){
                    console.log('Da gui')
                    await blogService.deleteBlogByIdAuto(blog._id);
                    await mailService.sendInformDeleteBlog(blog.user.email,blog.title);
                }
            }
        }
    }
    static deleteTag = async (tagId,authenticatedUser)=>{
        const tag = await Tag.findById(tagId);
        if(!tag) return 1;
        await mailService.sendInformDeleteTag(tag.user.email,tag.name);
        await tagService.deleteTag(tag._id,authenticatedUser);
        return 0;
    }
    static deleteCategory = async (categoryId, authenticatedUser) => {
        const category = await Category.findById(categoryId);
        if(!category) return 1;
        await mailService.sendInformDeleteGroup(category.isAdmin.email,category.name);
        await categoryService.deleteCategoryById(category._id, authenticatedUser);
        return 0;
    }


}
module.exports = AdminService;