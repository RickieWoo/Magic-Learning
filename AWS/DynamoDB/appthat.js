'use strict'
var express = require('express');
var AWS = require("aws-sdk");
var bodyParser = require('body-parser');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var app = express();
var docClient = new AWS.DynamoDB.DocumentClient();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) //将表单数据格式化

app.get('/Notes', function(req, res) {
    console.log('I get a req');
    var table = "Notes";
    var params = {
        TableName: table,
    };
    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("scanItem succeeded:", JSON.stringify(data.Items, null, 2));
            res.json(data.Items);
        }
    });
});
//post data
app.post('/Notes', function(req, res) {
    var table = "Notes";
    var id = new Date().getTime();
    var title = req.body.title;
    var info = req.body.info;
    var country = req.body.country;
    var params = {
        TableName: table,
        Item: {
            "id": id,
            "title": title,
            "info": info,
            "country": country
        }
    };

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.json(data);
        }
    });

});
//delete data 
app.delete('/Notes/:id', function(req, res) {
    var table = "Notes";
    var id = req.params.id;
    console.log(id + req.body.id);
    var params = {
        TableName: table,
        Key: {
            "id": id,
        }
    };
    console.log("Attempting a conditional delete...");
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
});

//update data
app.put('/Notes/:id', function(req, res) {

    var table = "Notes";
    var id = req.params.id;

    var params = {
        TableName: table,
        Key: {
            "id": id,
        },

        UpdateExpression: "set info = :i,title=:t,country=:c",
        ExpressionAttributeValues: {
            ":i": req.body.info,
            ":t": req.body.title,
            ":c": req.body.country
        },
        ReturnValues: "UPDATED_NEW"

    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            res.json(data);
        }
    });
});
//todo
app.get('/Notes/:id', function(req, res) {
    var params = {
        TableName: "Notes",
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames: {
            "#yr": "id"
        },
        ExpressionAttributeValues: {
            ":yyyy": (req.params.id)
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                res.json(item);
            });
        }
    });
});
app.listen(3003);
console.log("app runs at port:3003 :)");