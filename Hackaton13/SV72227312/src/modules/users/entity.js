const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  DNI: {type: String, required: true},
  name: {type: String, required: true},
  courses: [{type:Schema.Types.ObjectId, ref: "Course"}],
  email: {type: String, required: true},
  password: {type: String, required: true},
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;