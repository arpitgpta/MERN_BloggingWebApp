const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Blog = require('./models/blogModel')
const User = require('./models/userModel')


mongoose.connect('mongodb+srv://saketvajpai:saketvajpai@cluster0.ahl3y.mongodb.net/ContentWise?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))


// send all blogs to client
app.get('/allBlogs', (req, res) => {
    Blog.find({}).then(blog => {
        res.json(blog)
    })
})



// TODO: still hardcoded we have to write logic to send trending topics only
app.get('/trendingTopics', (req, res) => {
    var trendingTopics = {
        topics: ['Science', 'IoT', 'Maths', 'Jossa', 'CSS', 'Cloud Computing', 'Hacktober', 'NIT Patna', 'Lucknow : The royal city', 'Novels', 'Robotics', 'ES6']
    }
    res.json(trendingTopics)
})

app.get('/trendingBlogs', (req, res) => {
    Blog.find({}).then(blog => {

        blog.sort((a, b) => {
            return b.likes - a.likes
        }) // sort all blogs


        var trendingBlogs = []
        for (var i = 0; i < 8; i++)
            trendingBlogs.push(blog[i]) // fetch first 8 trending topics 


        res.status(200).json(trendingBlogs)
    })
})



// TODO: write logic to fetch data for popular author
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

/*
    todo : 
        1. fetch array of tags in reguest
        2. see if author already exists in db
            if yes 
                then add id of newly created blog's id to the array of blogs of that author
            else
                create new autor too and add this blog in his list
        3. for every tag in tag list do same thing as for author
*/


app.post('/createNewBlog', (req, res) => {
    console.log('1. done');
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        authorId: req.body.authorID,
        body: req.body.body,
        tags: JSON.parse(req.body.tagString).tags
    })
    console.log(blog);
    User.find({ _id: blog.authorId })
        .exec()
        .then(author => {
            if (author.length === 1) {
                const prevUser = author[0]
                prevUser.blogs.push(blog._id)
                User.updateOne({ _id: prevUser._id }, { blogs: prevUser.blogs }, () => {
                    console.log('author updated');
                })
            }
            else {
                const user = new User({
                    _id: blog.authorId,
                    name: blog.author,
                    blogs: [blog._id]
                })
                user.save()
                    .then(result => {
                        console.log('user saved');
                        console.log(result);
                    })
                    .catch(err => console.log(err))
            }
        })

    blog.save().then(result => {
        console.log('blog saved');
        res.redirect(`/blog/${blog._id}`)
            .catch(err => console.log(err))
    })




    // TODO: redirect to newly created blog's page 
    // res.redirect('/newBlog') //----------------- will be removed, just for now
    // for redirection
})

const PORT = 5000
app.listen(PORT, () => {
    console.log('server is ready at ' + PORT);
})




// http://localhost:3000/getBlog/5f992d447707e22977c2337d
// http://localhost:3000/blog/5f992d447707e22977c2337d