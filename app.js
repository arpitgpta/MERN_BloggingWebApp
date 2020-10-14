const express = require('express')
const bodyParser = require('body-parser')
const { json } = require('body-parser')
const mongoose = require('mongoose')
const Blog = require('./models/blogModel')
const User = require('./models/userModel')

mongoose.connect('mongodb+srv://arpitgpta:arpitgpta@cluster0.ahl3y.mongodb.net/ContentWise?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/allBlogs', (req, res) => {
    Blog.find({}).then(blog =>{
        blog.sort((a, b) =>{
            return b.likes - a.likes
        })
    })
    res.send('okk')
})

app.get('/trendingTopics', (req, res) => {
    var trendingTopics = {
        topics: ['Science', 'IoT', 'Maths', 'Jossa', 'CSS', 'Cloud Computing', 'Hacktober', 'NIT Patna', 'Lucknow : The royal city', 'Novels', 'Robotics', 'ES6']
    }
    res.json(trendingTopics)
})


app.get('/trendingBlogs', (req, res) => {
    Blog.find({}).then(blog =>{
        blog.sort((a, b) =>{
            return b.likes - a.likes
        })
        var trendingBlogs = []
        for(var i = 0; i < 8; i++)
            trendingBlogs.push(blog[i])
        res.status(200).json(trendingBlogs)
    })
})


app.get('/popularAuthors', (req, res) => {
    res.send('json of popularAutors')
})


app.get('/getBlog/:blogid', (req, res) => {
    Blog.find({ _id: req.params.blogid })
        .exec()
        .then(blog => {
            res.status(200).json(blog[0])
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })

})


// app.post('/newBlog', (req, res) => {
//     const blog = new Blog({
//         _id: new mongoose.Types.ObjectId(),
//         title: req.body.title,
//         author: 'Aman Akshar',
//         authorId: '5f8404abc7881253c872c0e0',
//         body: req.body.body
//     })
//     blog.save().then(result => {
//         res.status(200).json(result)
//     })
//         .catch(err => console.log(err))

// })



const PORT = 5000
app.listen(PORT, () => {
    console.log('server is ready at ' + PORT);
})