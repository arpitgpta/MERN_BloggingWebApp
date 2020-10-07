const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/allPosts', (req, res)=>{
    console.log('all_posts');
    res.send('json of all post')
})


app.get('/youMayLike', (req, res)=>{
    console.log('youMayLike');
    res.send('json of you may like')
})


app.get('/trendingTopics', (req, res)=>{
    console.log('trendingTopics');
    res.send('json of trending topics')
})


app.get('/trendingPosts', (req, res)=>{
    console.log('trendingPosts');
    res.send('json of trending_posts')
})


app.get('/popularAuthors', (req, res)=>{
    console.log('popularAuthors');
    res.send('json of popularAutors')
})



app.get('/getBlog/:blogid', (req, res)=>{
    console.log(req.params.blogid)
    res.json({key: 'value'})
})




const PORT = 5000
app.listen(PORT, ()=>{
    console.log('server is ready at '+PORT);
})