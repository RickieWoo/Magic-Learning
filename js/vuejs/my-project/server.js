const express = require('express')
const mongojs = require('mongojs')
const bodyParser = require('body-parser')
const app = express()
const db = mongojs('sourceList', ['sourceList'])
const marked = require('marked')
const ejs = require('ejs')
const path = require('path')
// view engine setup
// app.set('view engine', 'ejs')
// html 模板

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // 将表单数据格式化
app.set('views', __dirname, './public')
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

app.get('/editor', function (req, res) {
  res.render('./public/editor')
})
app.get('/content/:id', function (req, res) {
  res.render('./public/content')
  console.log(req.params)
  let id = req.params.id
  // console.log(title + '--------ed--------------')
  db.sourceList.findOne({ id: id }, (err, docs) => {
    if (err) {
      console.log(err.stack)
    }
    res.json(docs)
  })
})

app.get('/sourceList', function (req, res) {
  console.log('I get a req' + JSON.stringify(req.body, null, 2))
  // find everything
  db.sourceList.find(function (err, docs) {
    // docs is an array of all the documents in mycollection
    if (err) {
      console.log(err.stack)
    }
    console.log(docs)
    res.json(docs)
  })
})
// post data
app.post('/sourceList', function (req, res) {
  console.log(req.body + ' eeeeeeeeeeeeeeee')
  let id = new Date().getTime().toString()
  let time = new Date().toLocaleString()
  req.body.id = id
  req.body.time = time
  req.body.content = marked(req.body.content)
  console.log(req.body.content)
  db.sourceList.insert(req.body, function (err, docs) {
    if (err) {
      console.log(err.stack)
    }
    res.json(docs)
  })
})
// delete data
app.delete('/sourceList/:id', function (req, res) {
  let id = req.params.id
  console.log(id + ' app.delete')
  db.sourceList.remove({ id: id }, function (err, docs) {
    if (err) {
      console.log(err.stack)
    }
    res.json(docs)
  })
})
// edit data
app.get('/sourceList/:id', function (req, res) {
  console.log(req.params)
  let id = req.params.id
  // console.log(title + '--------ed--------------')
  db.sourceList.findOne({ id: id }, function (err, docs) {
    if (err) {
      console.log(err.stack)
    }
    res.json(docs)
  })
})
// update data
app.put('/sourceList/:id', function (req, res) {
  let id = req.params.id
  let newId = new Date().getTime().toString()
  let time = new Date().toLocaleString()
  req.body.content = marked(req.body.content)
  console.log('_____________________---' + req.body.title + id)
  db.sourceList.findAndModify({
    query: { id: id },
    update: {
      $set: {
        title: req.body.title,
        content: req.body.content,
        sourceId: newId,
        time: time
      }
    },
    new: true
  }, function (err, doc) {
    if (err) {
      console.log(err.stack)
    }
    res.json(doc)
  })
})
