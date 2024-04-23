const Setting = require('../models/settingModel')

class AdminService{
 static addSetting= async (value) =>{
    const setting = new Setting({
        value: value
    });
    return setting.save();
 }
}
module.exports = AdminService;