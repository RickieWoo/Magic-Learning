"use strict";

var greet = require("./node");

var s = "Rick";

greet(s);

process.nextTick(function() {
    console.log("next tick callback");
});
console.log("next tick was set");

process.on("exit", function(code) {
    console.log("about to exit the code" + code);
});

if (typeof(window) == "undefined") {
    console.log("nodejs");
} else {
    console.log("browser");
}

var fs = require("fs");

fs.readFile("sample.jpg", function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + " bytes");
    }
});

fs.stat("sample.txt", function(err, stat) {
    if (err) {
        console.log(err);
    } else {
        console.log("isFile" + stat.isFile());
        console.log("isDir" + stat.isDirectory());
        if (stat.isFile()) {
            console.log("size" + stat.size);
            console.log("birth day" + stat.birthtime);
            console.log("modified time " + stat.mtime);
        }
    }
});

var ws = fs.createWriteStream("sample.txt", "utf-8");
ws.write("use stream to write data\n");
ws.write("END");
ws.end();

var rs = fs.createReadStream("sample.txt", "utf-8");
rs.on("data", function(chunk) {
    console.log("data::::");
    console.log(chunk);
});
rs.on("end", function() {
    console.log("Dnd");

});
rs.on("error", function(err) {
    console.log("error" + err);
});

// //________-
// var http = require('http');
// // 创建http server，并传入回调函数:
// var server = http.createServer(function(request, response) {
//     // 回调函数接收request和response对象,
//     // 获得HTTP请求的method和url:
//     console.log(request.method + ': ' + request.url);
//     // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     // 将HTTP响应的HTML内容写入response:
//     response.end('<h1>Hello world!</h1>');
// });

// server.listen(8080);
// console.log("the server is running at http://127.0.0.1:8080/");



const crypto = require("crypto");

const hash = crypto.createHash("md5");

hash.update("Hello world");

console.log(hash.digest("hex"));

function ads(x) {
    if (x > 0) return x;
    else return -x;
}
var abs = function(x) {

    if (x > 0) return x;
    else return -x;
};
console.log(ads(-2));
console.log(abs(-2));

function sum(...rest) {

    for (var i = 1; i < rest.length; i++) {
        rest[0] += rest[i];
    }
    if (rest[0] == undefined)
        return 0;
    return rest[0];
}
console.log(sum());

function Student(prop) {
    this.name = prop.name;
    this.hello = function() {
        console.log("hello  " + this.name);
    }
}
var xiaoming = new Student("小名");
xiaoming.hello();



function card() {
    this.face = 0;
    this.suit = "";
    this.setFace = function(newFace) {
        this.face = newFace;
    };
    this.setSuit = function(newSuit) {
        this.suit = newSuit;
    }
}

var A = new card();
card.prototype.shuffle = function() {
    var i = Math.random();
    var j = Math.random();
    while (i > 20) {
        i = i - 20;
    }
    while (j > 4) {
        j = j - 4;
    }
    this.setFace(i);
    this.setSuit(j);
}
A.setFace(1);
A.setSuit(2);
console.log(A.face);
console.log(A.suit);
A.shuffle();
console.log(A.face);
console.log(A.suit);

var Mary = '{"height":"1.65","weight":"45","age":"17"}';
var myObject = JSON.parse(Mary);
var out = "";
for (var i in myObject) {
    out += i + "=" + myObject[i] + "\n";
}
console.log(out);
var arr = [];
var arr1 = new Array();
console.log("type of arr " + typeof(arr) + "   and" + typeof(arr1))