const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');


const settingSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
  }, { timestamps: true, strict: false });
  settingSchema.plugin(autopopulate);

module.exports = mongoose.model('Setting', settingSchema);;
