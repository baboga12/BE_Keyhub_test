const Setting = require('../models/settingModel')

class AdminService{
 static addSettingsBlog= async (value) =>{
    const setting = new Setting({
        value: value
    });
    return setting.save();
 }
}
module.exports = AdminService;