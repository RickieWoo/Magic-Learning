require('./connect');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*定义模式Student_Schema*/
var Student_Schema = new Schema({
    name: String,
    id: Number,
    phone: String,
    date: Date

}, {
    versionKey: false
});

/*定义模型Student，数据库存的是students*/
var MyStudent = mongoose.model("Student", Student_Schema);
exports.MyStudent = MyStudent;

/*mongoose.Schema({
  username: {// 真实姓名
    type: String,
    required: true
  },
  password: { // 密码
    type: String,
    required: true
  }
});*/