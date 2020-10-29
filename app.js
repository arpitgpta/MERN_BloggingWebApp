const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// database models
const Blog = require('./models/blogModel')
const User = require('./models/userModel')
const { findOneAndUpdate } = require('./models/blogModel')
const { static } = require('express')
const TagData = require('./models/TagModel')



// connecting to database
mongoose.connect('mongodb+srv://saketvajpai:saketvajpai@cluster0.ahl3y.mongodb.net/ContentWise?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .catch(err => console.log(err))

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('/client/public'))


// send all blogs to client
app.get('/allBlogs', (req, res) => {
    Blog.find({})
        .then(blog => {
            res.json(blog)
        })
        .catch(err => console.log(err))
})



// TODO: still hardcoded we have to write logic to send trending topics only
app.get('/trendingTopics', (req, res) => {
    // var trendingTopics = {
    //     topics: ['Science', 'IoT', 'Maths', 'Jossa', 'CSS', 'Cloud Computing', 'Hacktober', 'NIT Patna', 'Lucknow : The royal city', 'Novels', 'Robotics', 'ES6']
    // }
    // res.json(trendingTopics)
    TagData.find({}).then(tagData => {
    
        tagData.sort((a, b) => {
            return b.blogsId.size() - a.blogsId.size()
        }) // sort all blogs
    
    
        var trendingTags = []
        for (var i = 0; i < 5; i++)
            trendingTags.push(tagData[i]) // fetch first 8 trending topics 
    
        res.status(200).json(trendingTags)
    })
})


/**
 * In landing page we requrie 8 trending topics to show 
 * for this we have to triverse through all blogs and find top 8 blogs
 * 
 * this process is time consuming, here we are doing this process hourly and
 * storing that data in an object
 * So we will perform this operation one in an hour
 */
const trendingBlogsCache = {
    blogs: [],
    timeStamp: Date.now()
}

app.get('/trendingBlogs', (req, res) => {

    // convert miliseconds in hours
    let timePassed = (Date.now() - trendingBlogsCache.timeStamp) / (1000 * 3600)
    let shouldFetch = (timePassed > 1 || trendingBlogsCache.blogs.length === 0)
    // we will fetch only if one hour is passed or this is first time


    if (shouldFetch) {

        Blog.find({}).then(blog => {

            // sort all blogs
            blog.sort((a, b) => {
                return b.likes - a.likes
            })

            // fetch first 8 trending topics 
            var trendingBlogs = []
            for (var i = 0; i < 8; i++)
                trendingBlogs.push(blog[i])


            // store before sending
            trendingBlogsCache.blogs = trendingBlogs
            trendingBlogsCache.timeStamp = Date.now()


            res.status(200).json(trendingBlogs)
        })
    }
    else {

        // send from cached data
        res.status(200).json(trendingBlogsCache.blogs)
    }
})



// TODO: write logic to fetch data for popular author
app.get('/popularAuthors', (req, res) => {
    res.send('json of popularAutors')
})


/**
 * Router to send a particular blog
 */
app.get('/getBlog/:blogId', (req, res) => {
    Blog.find({ _id: req.params.blogId })
        .exec()
        .then(blog => {
            res.status(200).json(blog[0])
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})



/**
 * Router to create new blog here we are doing 3 things
 * 1. store data in blog's collections
 * 2. store blog id in the authors blog array
 * 3. store blog id in tag's blog array
 */
app.post('/createNewBlog', (req, res) => {


    // creating new blog by fetching data from request
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        authorId: req.body.authorID,
        body: req.body.body,
        tags: JSON.parse(req.body.tagString).tags
    })

    // check if that author already exists in database
    // if yes 
    //     we have to update users collection 
    // else 
    //     we have to create new user 
    User.find({ _id: blog.authorId })
        .exec()
        .then(author => {

            if (author.length === 1) { // author already exist in db

                const prevUser = author[0]
                prevUser.blogs.push(blog._id)
                User.updateOne({ _id: prevUser._id }, { blogs: prevUser.blogs }, () => {
                    console.log('author updated');
                }).catch(err => console.log(err))

            }
            else { // new author case

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
    blog.tags.forEach(element => {
        TagData.find({ tagName: element })
            .exec()
            .then()
            .then(blogsId => {
                if (blogsId.length === 1) {
                    const prevTag = blogsId[0]
                    prevTag.blogsId.push(blog._id)
                    TagData.updateOne({ tagName: prevTag.tagName }, { blogsId: prevTag.blogsId }, { tagLikesCount : prevTag.tagLikesCount }, () => {
                        console.log('tags updated');
                    })
                }
                else {
                    const tagData = new TagData({
                        // _id: blog.authorId,
                        tagName: element,
                        blogsId: [blog._id], 
                        tagLikesCount: 1
                    })
                    tagData.save()
                    .then(result => {
                        console.log('tags created');
                        console.log(result);
                    })
                    .catch(err => console.log(err))
                }
            })
    })


    blog.save().then(result => {
        console.log('blog saved');
        res.redirect(`/blog/${blog._id}`)
    })
        .catch(err => console.log(err))



    // TODO: redirect to newly created blog's page
    // res.redirect('/newBlog') //----------------- will be removed, just for now
    // for redirection
})



/**
 * Router to like request for a blog
 * does following things:
 * 1. checks if already likes // TODO: make sure client side this request is not generated
 * 2. if already dislikes, make it like
 * 3. else like
 * 
 * we have to update all 3 tables if someone likes a blog
 * 1. update that blog's like count
 * 2. add that blog in user's liked blog list
 * 3. update like count of all tags associated to that blog 
 */
app.post('/like', (req, res) => {

    /**
     * here request will contain 2 fields
     * 1. blog id
     * 2. user id
     * 3. list of tags
     */
    const request = JSON.parse(Object.keys(req.body)[0])

    /**  
     * Also there are two cases 
     * 1. user already exists in databse 
     * 2. does not exists
     */
    User.find({ _id: request.userId })
        .exec()
        .then(dbResponseUser => {
            if (dbResponseUser.length === 1) { // if user exists in database

                /**
                 * There are 3 cases
                 * 1. already likes the blog
                     * 2. dislikes the blog
                     * 3. otherwise
                     */
                let alreadyLikesBlog = dbResponseUser[0].likedBlogs.includes(request.blogId)
                let dislikesBlog = dbResponseUser[0].disLikedBlogs.includes(request.blogId)
                
                if (alreadyLikesBlog) {
                    console.log('called to like and already likes');
                    res.json({  // sending -1 as a flag to do nothing
                        likes: -1,
                        dislikes: -1
                    })

                }
                else if (dislikesBlog) {
                    console.log('called to like but dislikes');
                    // TODO: update likes count of blog and all tags 
                    User.findOneAndUpdate({ _id: request.userId }, {
                        $push: {
                            likedBlogs: request.blogId
                        },
                    },
                        { upsert: true }
                    )
                        .catch(err => console.log(err))


                    User.findOneAndUpdate({ _id: request.userId }, {
                        $pull: {
                            disLikedBlogs: request.blogId
                        },
                    },
                        { upsert: true }
                    )
                        .catch(err => console.log(err))


                    Blog.findOneAndUpdate({ _id: request.blogId }, {
                        $inc: {
                            likes: 1,
                            dislikes: -1
                        }
                    },
                        {
                            new: true
                        })
                        .then(_ => {
                            res.json({
                                likes: _.likes,
                                dislikes: _.dislikes
                            })
                        })
                        .catch(err => console.log(err))

                }
                else {
                    console.log('called to like normal case');
                    User.findOneAndUpdate({ _id: request.userId }, {
                        $push: {
                            likedBlogs: request.blogId
                        }
                    },
                        { upsert: true }
                    )
                        .catch(err => console.log(err))

                    Blog.findOneAndUpdate({ _id: request.blogId }, {
                        $inc: {
                            likes: 1,
                        }
                    },
                        {
                            new: true
                        })
                        .then(_ => {
                            res.json({
                                likes: _.likes,
                                dislikes: _.dislikes
                            })
                        })
                        .catch(err => console.log(err))
                }
            }
            else { // for new user
                console.log('called to like new user');
                const user = new User({
                    _id: request.userId,
                    likedBlogs: [request.blogId]
                })
                user.save()
                Blog.findOneAndUpdate({ _id: request.blogId }, {
                    $inc: {
                        likes: 1,
                    }
                },
                    {
                        new: true
                    })
                    .then(_ => {
                        res.json({
                            likes: _.likes,
                            dislikes: _.dislikes
                        })
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))

})


/**
 * TODO: do same as like router
 */
app.post('/dislike', (req, res) => {
    /**
     * here request will contain 2 fields
     * 1. blog id
     * 2. user id
     * 3. list of tags
     */
    const request = JSON.parse(Object.keys(req.body)[0])

    /**  
     * Also there are two cases 
     * 1. user already exists in databse 
     * 2. does not exists
     */
    User.find({ _id: request.userId })
        .exec()
        .then(dbResponseUser => {
            if (dbResponseUser.length === 1) { // if user exists in database

                /**
                 * There are 3 cases
                 * 1. already likes the blog
                     * 2. dislikes the blog
                     * 3. otherwise
                     */
                let alreadyDisLikesBlog = dbResponseUser[0].disLikedBlogs.includes(request.blogId)
                let likesBlog = dbResponseUser[0].likedBlogs.includes(request.blogId)

                if (alreadyDisLikesBlog) {
                    console.log('called to dislike and already');
                    res.json({  // sending -1 as a flag to do nothing
                        likes: -1,
                        dislikes: -1
                    })

                }
                else if (likesBlog) {
                    console.log('called to dislike but likes');
                    // TODO: update likes count of blog and all tags 
                    User.findOneAndUpdate({ _id: request.userId }, {
                        $push: {
                            disLikedBlogs: request.blogId
                        },
                    },
                        { upsert: true }
                    )
                        .catch(err => console.log(err))


                    User.findOneAndUpdate({ _id: request.userId }, {
                        $pull: {
                            likedBlogs: request.blogId
                        },
                    },
                        { upsert: true }
                    )
                        .catch(err => console.log(err))

                    Blog.findOneAndUpdate({ _id: request.blogId }, {
                        $inc: {
                            likes: -1,
                            dislikes: 1
                        }
                    },
                        {
                            new: true
                        })
                        .then(_ => {
                            res.json({
                                likes: _.likes,
                                dislikes: _.dislikes
                            })
                        })
                        .catch(err => console.log(err))

                }
                else {
                    console.log('called to dislike normal');
                    User.findOneAndUpdate({ _id: request.userId }, {
                        $push: {
                            disLikedBlogs: request.blogId
                        }
                    },
                        { upsert: true }
                    )
                        .catch(err => console.log(err))

                    Blog.findOneAndUpdate({ _id: request.blogId }, {
                        $inc: {
                            dislikes: 1,
                        }
                    },
                        {
                            new: true
                        })
                        .then(_ => {
                            res.json({
                                likes: _.likes,
                                dislikes: _.dislikes
                            })
                        })
                        .catch(err => console.log(err))
                }
            }
            else { // for new user
                console.log('called to dislike new user');
                const user = new User({
                    _id: request.userId,
                    likedBlogs: [request.blogId]
                })
                user.save().catch(err => console.log(err))

                Blog.findOneAndUpdate({ _id: request.blogId }, {
                    $inc: {
                        dislikes: 1,
                    }
                },
                    {
                        new: true
                    })
                    .then(_ => {
                        res.json({
                            likes: _.likes,
                            dislikes: _.dislikes
                        })
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))

})


const PORT = 5000
app.listen(PORT, () => {
    console.log('server is ready at port ' + PORT);
})