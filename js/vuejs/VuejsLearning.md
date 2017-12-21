##### Vuejs

#### 常见软件架构模型

[阮一峰]: http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html	"MVC，MVP 和 MVVM 的图示"



- MVVM

model-view-viewmodel

模型-视图-视图模型

![img](http://image.beekka.com/blog/2015/bg2015020110.png)

- MVC 

model-view-control

模型-视图-控制器

![img](http://image.beekka.com/blog/2015/bg2015020106.png)

![img](http://image.beekka.com/blog/2015/bg2015020107.png)

- MVP

Model View Presenter

![img](http://image.beekka.com/blog/2015/bg2015020109.png)



##### 11 16 Vuejs学习笔记

```js
v-on:
v-bind@
```

###### webpack 使用

```bash
$ npm install -g vue-cli
$ vue init webpack my-project
$ cd my-project
$ npm install
$ npm run dev	#watch
$ npm run build  #build
$ npm run unit
$ npm run e2e
```

> 其中执行npm install 遇到chromedriver报错，原因是被墙，用cnpm安装即可

init 得到的项目结构

build 除非自己自定义webpack加载器 否则不要改动

config 可以配置端口等信息，还可以修改代理，如

```json
dev:{
  port:2333，
  proxyTable: {
  '/linktobaidu':{
  target:'http://www.baidu.com/',
  changeOrigin: true,
  pathRewrite: {
  '^/api': ''
	}
  }
}
```



##### 组件

```js
//注册
Vue.component("new-component",{
  template:'<div>something like it</div>'
})
//创建根实例
new Vue({
  el:'#the-band-app',
})
//如果将注册组件写在根实例后面注册会失败
//全局注册和局部注册都需要将注册写在实例前面
```

- 组件中data必须是函数
- 自定义组件可能会因为受限制元素导致一些问题，解决方法是用 `is`

```html
<my-tr-row></my-tr-row>
变为
<tr is = 'my-tr-row'> </tr>
```

- 父组件使用`props` 传递数据给子组件，子组件通过`events`给父组件发消息
- 父子关系：`props down, events up`
  - 父>子：
    - 子组件在props中创建一个属性，用以接收父组件传过来的值
    - 父组件中注册子组件
    - 在子组件标签中添加子组件props中创建的属性
    - 把需要传给子组件的值赋给该属性
  - 子>父
    - 子组件中需要以某种方式例如点击事件的方法来触发一个自定义事件
    - 将需要传的值作为$emit的第二个参数，该值将作为实参传给响应自定义事件的方法
    - 在父组件中注册子组件并在子组件标签上绑定对自定义事件的监听

##### 注意事项

1. 组件的data必须是返回一个对象的函数，除了`new Vue`以外
2. props定义要详细
3. 最好把每个组件单独写成.vue或者.js文件
4. `v-for` 与 `key` 配合使用

```html
<li 
    v-for="thing in things" 
    :key=thing.id
    >
  {{thing.content}}
</li>
```

1. scope

> 当`<style>`标签具有该`scoped`属性时，其CSS将仅应用于当前组件的元素。

```html
<style scoped >
...css
</style>
```

##### 命名

1. 私有属性名

属性名最好继承组件名，`$_component_propname` ，作为用户私有属性名的约定。

```js
var myComponent = {
  methods:{
    $_myComponent_add:function(){...}
  }
}
```



1. 组件名为多个单词，作用一目了然，而且不会与html元素冲突
2. 命名最好是首字母大写，并采用关键词前置，因为当组件很多时，由于文件是按首字母排序，所以可以用这样的命名方式很轻松的看清楚对一个元素都进行了哪些操作。

```json
SearchList
SearchListItem
SearchListItemContent
```

1. 基础组件名常用的`Base` `V` `App`
2. 单例组件名：如果这个组件比较特殊，不会有上面那种操作的话，就在前面加个`The`以示唯一性。
3. 单文件组件：自闭合，首字母大写命名
4. DOM模板中：**不要**自闭合，采用-连接命名，因为html模板不区分大小写。
5. 组件名倾向于完整的单词名而不是缩写
6. 非空 HTML 特性值应该始终带双引号 

#### 11.7 Vuejs学习

常用全局模块

1. webpack，模块加载器兼打包工具，能把各种资源作为模块来使用和处理

2. gulp，一个自动化构建工具，开发者可以使用它在项目开发过程中自动执行常见任务。

   gulp相关模块：

   ```
   gulp                                  // 用来构建自动化工作流
   gulp-sftp                             // 将代码自动部署到服务器上
   del                                   // 代码部署成功后，删除本地编译的代码
   ```