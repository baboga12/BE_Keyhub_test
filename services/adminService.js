const Setting = require('../models/settingModel')

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
}
module.exports = AdminService;