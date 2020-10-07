const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/getBlog/:blogid', (req, res)=>{
    console.log(req.params.blogid)
    res.json({key: 'value'})
})
const PORT = 5000
app.listen(PORT, ()=>{
    console.log('server is ready at '+PORT);
})