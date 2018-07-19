const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContactSchema = new Schema({
  name:{type: String, require: true, minlength:2, maxlength:30},
  lastName:{type:String, require:true, minlength:2, maxlength:30},
  email:{type:String, require:true, minlenght:5, maxlenght:60},
  contactNumber:{type:String, require:true, minlength:4, maxlength:20},
  age:{type:Number, require:true, min:13, max:100},
  registerDate:{type:Date, default:Date.now()}
});

module.exports= mongoose.model('Contact',ContactSchema);
