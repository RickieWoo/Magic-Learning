require("./mongoose-db");
var express = require("express");
var mongoose = require("mongoose");
var MyStudent = require("./mongoose-db").MyStudent;
var app = express();
var path = require('path');

app.use(express.static(__dirname + '\\'));
app.get("/create", function(req, res) {
    console.log("create 函数")
    var beta = new MyStudent({
        name: "beta",
        id: 124,
        phone: "1871111111",
        date: Date.now()
    });
    beta.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('存入成功');
        }
    });
    res.send("存入成功！！");

});

app.get("/read", function(req, res) {
    console.log("读取函数");
    MyStudent.find({}, function(err, docs) {
        console.log(docs);
        /*对docs进行操作*/
    });

    res.send("读取成功！！");

});

app.get("/readOne", function(req, res) {
    console.log("读取单值函数");
    MyStudent.findOne({
        name: req.query.student_name
    }, {
        "id": 1,
        "_id": 0
    }, function(err, docs) {
        if (docs.id === req.query.student_id) {
            res.send('登录成功');
            console.log(docs.password);
        } else {
            console.log(docs.password);
            res.send('登录失败');
        }
    });
    /*过滤查询,参数2: {'name':1, 'password':0} 查询文档的返回结果包含name , 不包含password.(_id默认是1)*/
    /*model.find({},null,{limit:20});过滤查询,参数3: 游标操作 limit限制返回结果数量为20个,如不足20个则返回所有*/

});

app.get("/update", function(req, res) {
    console.log("更新函数");
    MyStudent.update({
        name: "sam976"
    }, {
        id: 456,
        phone: "12345678910"
    }, function(error) {});
    res.send("更新成功！！");

});

app.get("/delete", function(req, res) {
    console.log("删除函数");
    MyStudent.remove({
        name: 'sam976'
    }, function(err) {
        if (err) return handleError(err);
        // removed!
    });
    res.send("删除成功！！");

});

app.listen(3001, function() {
    console.log("start server")
});