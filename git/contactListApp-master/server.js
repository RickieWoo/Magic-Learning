var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('contactlist', ['contactlist']);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/contactlist', function(req, res) {
    console.log('i recieved a get req');
    db.contactlist.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
    // person1 = {
    // name:'Amrith',
    // email:'amr',
    // phone:'777'};
    // person2 = {
    // name:'Su',
    // email:'latha',
    // phone:'888'};
    // person3 = {
    // name:'pa',
    // email:'pvt',
    // phone:'999'
    // };
    // var contactlist = [person1, person2, person3];
    // res.json(contactlist);
});
app.post('/contactlist', function(req, res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, docs) {
        res.json(docs);
    });
});
app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id + req.body.name + "is delete");
    db.contactlist.remove({ _id: mongojs.ObjectId(id) }, function(err, docs) {
        res.json(docs)
    });
});
app.get('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({ _id: mongojs.ObjectId(id) }, function(err, docs) {
        res.json(docs);
    });
});
app.put('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name, email: req.body.email, phone: req.body.phone } },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });

});
app.listen(3000);
console.log("server up");