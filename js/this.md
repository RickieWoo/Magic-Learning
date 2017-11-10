# this

this 单独作为普通函数调用的时候，指向的是全局对象（window），如果ECMAScript5的情况下，this是undefined。

``` javascript
'use strict';
function foo(){
    console.log(this);
}
foo();				// undefined
```

``` javascript
function fun(){
    console.log(this);
}
fun();					//window
```



this 作为对象的方法进行调用的时候，指向的是该对象，