const mongoose = require('mongoose');
const {Schema} = mongoose;

const TechnologySchema = new Schema({
    name: {type:String},
    description: {type:String},
    tags: [{type:String}],
    logo: {type:String}
}, {timestamps:{createdAt:true, updatedAt:true}});

module.exports = mongoose.model("Technology", TechnologySchema);