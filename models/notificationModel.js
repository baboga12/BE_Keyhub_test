const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const NotificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate : true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate : true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        autopopulate : true 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        autopopulate : true 
    },
    type: {
        type: String,
        enum: ['Follow', 'Comment', 'Like','Invite','Accept','AcceptBlog','DeclineBlog','Chat'],
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        autopopulate : true
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        autopopulate : true
    },
}, { timestamps: true,  strict: false });
NotificationSchema.plugin(autopopulate)
module.exports = mongoose.model('Notification', NotificationSchema);
