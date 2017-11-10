function runAsync() {
    var p = new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('run ook');
            resolve('whatever');
        }, 2000);;
    })
    return p;
}

runAsync().then(function(data) {
    console.log(data);
})