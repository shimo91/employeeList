const mongoose = require('mongoose');
const empSchema=mongoose.Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
})
const EmployeeData=mongoose.model('employeelist',empSchema);
module.exports=EmployeeData;