const express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 3000

var data = express()
hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear',()=>{
    return  new Date().getFullYear()
})
 data.use((req,res,next)=>{
    res.render('maintain.hbs')
})
data.use(express.static(__dirname+'/public'))
data.use((req,res,next)=>{
    var time = new Date()
    console.log(`${time}:${req.method} ${req.url}`)
    next()
})

hbs.registerHelper('scremIt',(text)=>{
    return text.toUpperCase()
})

data.get('/',(req,res)=>{
    // res.send('Welcome to express')
    res.render('home.hbs',{
        pageTitle:'Home page',
        welcomeMsg:'My page',
    })
})

data.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page'
    })
})

data.listen(port,()=>{
    console.log(`server is up in port ${port}`)
})