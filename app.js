const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/all_posts', (req, res)=>{
    console.log('all_posts');
    res.send('json of all post')
})


app.get('/you_may_like', (req, res)=>{
    console.log('you_may_like');
    res.send('json of you may like')
})


app.get('/trending_topics', (req, res)=>{
    console.log('trending_topics');
    res.send('json of trending topics')
})


app.get('/trending_posts', (req, res)=>{
    console.log('trending_posts');
    res.send('json of trending_posts')
})


app.get('/popular_autors', (req, res)=>{
    console.log('popular_autors');
    res.send('json of popular_autors')
})



app.get('/getBlog/:blogid', (req, res)=>{
    console.log(req.params.blogid)
    res.json({key: 'value'})
})




const PORT = 5000
app.listen(PORT, ()=>{
    console.log('server is ready at '+PORT);
})