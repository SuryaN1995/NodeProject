const _ = require('lodash')
var express = require('express')
var body_parser = require('body-parser')
var {authenticate} = require('./middleware/authenticate')

var {
    ObjectID
} = require('mongodb')

var {
    mongoose
} = require('./db/mongoose')
var {
    Todo
} = require('./models/todos')
var {
    User
} = require('./models/user')

var app = express()
app.use(body_parser.json())
app.post('/todos',authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator : req.user._id
    })
    todo.save().then((doc) => {
        res.send(doc)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.get('/todos',authenticate, (req, res) => {
    Todo.find({
        _creator:req.user._id
    }).then((todo) => {
        res.send({
            todo
        })
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/todos/:id',authenticate, (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id))
        return res.status(400).send()
    Todo.findOne({
        _id:id,
        _creator:req.user._id
    }).then((todo) => {
        if (!todo)
            return res.status(400).send()
        res.send({
            todo
        })

    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.delete('/todos/:id',authenticate, (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id))
        return res.status(400).send()
    Todo.findByIdAndRemove({
        _id:id,
        _creator:req.user._id
    }).then((todo) => {
        if (!todo)
            return res.status(400).send()
        res.send({
            todo
        })

    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.patch('/todos/:id',authenticate, (req, res) => {
    var id = req.params.id
    var body = _.pick(req.body, ['text', 'completed'])
    if (!ObjectID.isValid(id))
        return res.status(400).send()
    if (_.isBoolean(body.completed) && body.completed) {

    } else {
        body.completed = false
    }
    Todo.findByIdAndUpdate({
        _id:id,
        _creator:req.user._id
    }, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(400).send()
        }
        res.send({
            todo
        })
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    var user = new User(body)

    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.post('/users/login',(req,res)=>{
    var body = _.pick(req.body,['email','password'])
    User.findByCredential(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth', token).send(user)
        })
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.send()
    },()=>{
        res.status(400).send()
    })
})


app.get('/users/me', authenticate,(req, res) => {
    res.send(req.user)
})


app.listen(3000, () => {
    console.log('Started on port 3000')
})