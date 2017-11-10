# 1 流 Stream
```js
    var rs = fs.createReadStream("sample.txt", "utf-8");
    rs.on("data", function(chunk) {
        console.log("data::::");
        console.log(chunk);
    });
```


OUTPUT:

        data::::
        use stream to write data
        data::::
        END
 流是一行行读的，因此没读到流尾的时候会逐行读取流。

