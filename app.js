const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')


// database models
const Blog = require('./models/blogModel')
const User = require('./models/userModel')
const TagData = require('./models/TagModel')

// routes
const allBlogsRoute = require('./routes/allBlogs')
const likeRoute = require('./routes/like')
const disLikeRoute = require('./routes/dislike')
const trendingTopicsRoute = require('./routes/trendingTopics')
const trendingBlogsRoute = require('./routes/trendingBlogs')
const popularAuthorsRoute = require('./routes/popularAuthors')
const getBlogRoute = require('./routes/getBlog')
const createNewBlogRoute = require('./routes/createNewBlog')


// connecting to database
mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .catch(err => console.log(err))


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, '/client/public')))
// app.use(express.static(path.join(__dirname, 'client/build')))

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.static(path.join(__dirname, 'client', 'public')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });




app.use('/fetchAllBlogs', allBlogsRoute)
app.use('/trendingTopics', trendingTopicsRoute)
app.use('/trendingBlogs', trendingBlogsRoute)
app.use('/popularAuthors', popularAuthorsRoute)
app.use('/getBlog', getBlogRoute)
app.use('/createNewBlog', createNewBlogRoute)
app.use('/like', likeRoute)
app.use('/dislike', disLikeRoute)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})


const PORT = 5005
app.listen(PORT, () => {
    console.log('server is ready at port ' + PORT);
})
